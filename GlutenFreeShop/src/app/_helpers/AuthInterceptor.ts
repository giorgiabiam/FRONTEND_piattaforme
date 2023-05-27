import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';



@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem("token")
    // console.log("token in interceptor: ", token)

    let clonedReq = req.clone({   //clona sempre la richiesta prima di manipolarla
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    //TODO if (req.url.includes('admin')) può accedere solo if(token includes role ADMIN)

    return next.handle(clonedReq).pipe(catchError((error) => {
      if ( error instanceof HttpErrorResponse && error.status === 403 ) {
        sessionStorage.clear()
        this.router.navigate(['/login'])
      }

      // if (error instanceof HttpErrorResponse && error.status === 403 && req.url.includes('auth/register') ) {
      //   this.router.navigate([''])
      // }

      return throwError(() => error);
    })
  );
  }

}
