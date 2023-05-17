import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private router: Router) {}

      // https://lironhazan.medium.com/angular-6-401-authentication-error-handling-888922def566

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem("token")
    if(token){
      req = req.clone({   //clona sempre la richiesta prima di manipolarla
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`
        }
      });
    }
      return next.handle(req).pipe( err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
              this.handle401error(req, next);
            }
          return throwError(()=> err);
      });
  }

  private handle401error(req: HttpRequest<any>, next: HttpHandler){
      //TODO controllare il token
      this.router.navigate(['login']);
  }

}
