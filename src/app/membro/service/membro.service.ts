import { HttpClient } from '@angular/common/http';
import { CadastroBasico } from './../model/cadastro-basico';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class MembroService {
    constructor(private httpClient: HttpClient) {

    }

    cadastrar(cadastroBasico:CadastroBasico) {
        return this.httpClient.post('http:localhost:8081/v1/membro/', cadastroBasico);
    }

    listar() {
        return this.httpClient.get<CadastroBasico[]>('http:localhost:8081/v1/membro/');
    }

    recuperarParaAlterar(id:number) {
        return this.httpClient.get('http:localhost:8081/v1/membro/'+id);
    }

    alterar(cadastroBasico:CadastroBasico) {
        return this.httpClient.put('http:localhost:8081/v1/membro/', cadastroBasico);
    }

    excluir(id:number) {
        return this.httpClient.delete('http:localhost:8081/v1/membro/'+id);
    }
}