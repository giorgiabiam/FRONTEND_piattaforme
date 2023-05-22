import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


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

    return next.handle(clonedReq);
    // .pipe( err => {
    //   if (err instanceof HttpErrorResponse && err.status === 401) { // 403 ?
    //       this.handle401error(req, next, token);
    //   }
    //   return throwError(()=> err);
    // });
  }

  private handle401error(req: HttpRequest<any>, next: HttpHandler, token:any){
    if(token){   //TODO controllare il token
      this.router.navigate(['login']);
    }
    this.router.navigate(['login']);
    // return next.handle(req);
  }

}
