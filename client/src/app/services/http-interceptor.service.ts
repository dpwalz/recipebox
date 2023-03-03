import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
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
    
    return next.handle(request).pipe(
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
