import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService{
    constructor(private http:HttpClient, private cookieService: CookieService){}

    autenticar(username:string, password:string){
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Basic '+ btoa('ekklesia:ekklesia-client')});
        return this.http.post(
            'http://localhost:9092/oauth/token',{username, password}, {headers:headers, params:{grant_type:'password', username, password}})
        .pipe(tap(res =>{
            const access_token:string = res['access_token'];
            const refresh_token:string = res['refresh_token'];
            const expires_in:number = res['expires_in'];
            const dataLimiteToken = new Date();
            dataLimiteToken.setSeconds(dataLimiteToken.getSeconds() + expires_in);
            this.cookieService.set('access_token', access_token, dataLimiteToken);
            this.cookieService.set('refresh_token', refresh_token, expires_in);
        }))
    }
}