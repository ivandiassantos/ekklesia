import { CEP } from './cep';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ 
    providedIn: 'root' 
})
export class ConsultaCEPService {
    constructor(private httpClient:HttpClient){}

    consultar(cep:string){
        return this.httpClient.get<CEP>('https://viacep.com.br/ws/'+cep+'/json/');
    }
}