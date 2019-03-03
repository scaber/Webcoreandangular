import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { catchError  } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
 

@Injectable()
export class  ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status===401) {
                        return throwError(error.statusText);
                    }
                    const applicationError= error.headers.get('Application-Error');
                    if(applicationError){
                        console.error(applicationError);
                        return throwError(applicationError);
                    }
                    const serverError = error.error;
                    let madalStateErrors = '';
                    if (serverError && typeof serverError === 'object'){
                        for (const key in serverError) {
                          if (serverError[key]) 
                          {
                            madalStateErrors += serverError[key] + '\n';
                          }
                            
                        }
                    }

                    return throwError(madalStateErrors || serverError || 'Server Error');
                    
                }
            })
        );
    }
}

export const ErrorInterceptorProvide = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}