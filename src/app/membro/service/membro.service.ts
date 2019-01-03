import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Membro } from '../model/membro';
@Injectable({
    providedIn: 'root'
})
export class MembroService {
    constructor(private httpClient: HttpClient) {

    }

    cadastrar(membro:Membro) {
        return this.httpClient.post('http://localhost:9093/v1/membro/cadastrobasico', membro);
    }

    listar() {
        return this.httpClient.get<Membro[]>('http://localhost:9093/v1/membro/', {
            headers:new HttpHeaders({'Content-type': 'application/json; charset=utf-8'})
        });
    }

    obterPor(idMembro: number) {
        return this.httpClient.get<Membro>('http://localhost:9093/v1/membro/' + idMembro, {
            headers: new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8' })
        });
    }

    alterar(membro:Membro) {
        return this.httpClient.put('http:localhost:8081/v1/membro/', membro);
    }

    excluir(id:number) {
        return this.httpClient.delete('http://localhost:9093/v1/membro/'+id,{
            headers:new HttpHeaders({'Content-type': 'application/json; charset=utf-8'})
        });
    }
}