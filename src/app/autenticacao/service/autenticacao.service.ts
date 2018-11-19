import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService{
    constructor(private http:HttpClient, private tokenService: TokenService){}

    autenticar(email:string, password:string){
        return this.http.post('http://localhost:8081/v1/token/generate', 
        {email, password}, {observe: 'response'})
        .pipe(tap(res =>{
            this.tokenService.armazena(res.body['token']);
        }))
    }
}