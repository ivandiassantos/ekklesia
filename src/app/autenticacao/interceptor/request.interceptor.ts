import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private tokenService:TokenService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if(this.tokenService.existe()){
            const token = this.tokenService.obtem();
            req = req.clone({
                setHeaders:{
                    'token': token
                }
            })
        } 
        return next.handle(req);
    }
}