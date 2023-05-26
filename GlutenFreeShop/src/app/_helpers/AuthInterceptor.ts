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
    console.log("token in interceptor: ", token)

    let clonedReq = req.clone({   //clona sempre la richiesta prima di manipolarla
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(clonedReq).pipe(catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 403) { // se scade il token
        // && !req.url.includes('auth/login')
        sessionStorage.clear()
        this.router.navigate(['/login'])
      }
      return throwError(() => error);
    })
  );
  }

}
