import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private cookieService:CookieService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if(this.cookieService.check('access_token')){
            const token = this.cookieService.get('access_token');
            req = req.clone({
                setHeaders:{
                    'Authorization': 'Bearer '+token
                }
            })
        } 
        return next.handle(req);
    }
}