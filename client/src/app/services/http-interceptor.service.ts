import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MessageService } from 'primeng/api';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private messageService: MessageService
  ) {}

  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const authToken = `Bearer ${localStorage.getItem('id_token')}`;
    const authReq = request.clone({ setHeaders: { Authorization: authToken } });

    return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status !== 401) {
            // console.log(error.error.data.error);
            // this.messageService.add( {severity: "error",
            // summary: "GeeksforGeeks",
            // detail: "Success Service Message"});
          }
          return throwError(() => error.error.data);
        })
    )
  }
}
