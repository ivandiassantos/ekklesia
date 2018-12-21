import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dominio } from '../model/dominio';
import { UF } from '../model/uf';
import { Profissao } from 'src/app/membro/model/profissao';
import { TipoTelefone } from 'src/app/membro/model/tipo-telefone';

@Injectable({
    providedIn: 'root'
})
export class DominioService{
    
    constructor(private httpClient:HttpClient){}

    listarAlocacao() {
        return this.httpClient.get<Dominio[]>('http://localhost:9093/v1/dominio/alocacao');
    }

    listarEstadosCivis(){
        return this.httpClient.get<Dominio[]>('http://localhost:9093/v1/dominio/estadocivil');
    }

    listarEscolaridades(){
        return this.httpClient.get<Dominio[]>('http://localhost:9093/v1/dominio/escolaridade');
    }

    listarEstados(){
        return this.httpClient.get<UF[]>('http://localhost:9093/v1/dominio/uf');
    }

    listarProfissoes(){
        return this.httpClient.get<Profissao[]>('http://localhost:9093/v1/dominio/profissao');
    }

    listarTiposTelefone(){
        return this.httpClient.get<TipoTelefone[]>('http://localhost:9093/v1/dominio/tipotelefone');
    }

    listarSexo(){
        return this.httpClient.get<Dominio[]>('http://localhost:9093/v1/dominio/sexo');
    }
}