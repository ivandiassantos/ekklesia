import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService{
    constructor(private http:HttpClient, private tokenService: TokenService){}

    autenticar(username:string, password:string){
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Basic '+ btoa('ekklesia:ekklesia-client')});
        return this.http.post(
            'http://localhost:9092/oauth/token',{username, password}, {headers:headers, params:{grant_type:'password', username, password}})
        .pipe(tap(res =>{
            console.log(res);
        }))
    }
}
