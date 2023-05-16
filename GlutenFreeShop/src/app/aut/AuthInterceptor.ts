import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  private isRefreshing = false;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req) ;

      // req = req.clone({  //clona sempre la richiesta prima di manipolarla
      //   withCredentials: true,
      // });

      // return next.handle(req).pipe(
      //   catchError( err => {
      //     if(err instanceof HttpErrorResponse && err.status==401){
      //       return this.handle401error(req, next);
      //     }
      //     return throwError(()=> err);
      //   })
      // );
  }

  private handle401error(req: HttpRequest<any>, next: HttpHandler){
      //TODO
  }

}
