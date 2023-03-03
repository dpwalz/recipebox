import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpHeaders,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';



import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private appService: AppService) {

    }

    /**
     * 
     * @param req - parameter to handle http request
     * @param next - parameter for http handler
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        /**
         * Handle newly created request with updated header (if given)
         */
        return next.handle(req).do((event: HttpEvent<any>) => {
            /**
             * Sucessfull Http Response Time.
             */
            if (event instanceof HttpResponse) {
                const elapsed = Date.now() - started;
            }

        }, (err: any) => {
            /**
             * redirect to the error_handler route according to error status or error_code
             * or show a modal
             */
            if (err instanceof HttpErrorResponse) {
                console.log(err);
            }
        });
    }

}