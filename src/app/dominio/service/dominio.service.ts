import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Dominio } from "../model/dominio";

@Injectable({
    providedIn: 'root'
})
export class DominioService{
    
    constructor(private httpClient:HttpClient){}

    listarSexos(){
        return this.httpClient.get<Dominio[]>('http://localhost:8081/v1//dominio/sexo');
    }

    listarEstadosCivis(){
        return this.httpClient.get<Dominio[]>('http://localhost:8081/v1//dominio/estadocivil');
    }

    listarEscolaridades(){
        return this.httpClient.get<Dominio[]>('http://localhost:8081/v1//dominio/escolaridade');
    }

    listarEstados(){
        return this.httpClient.get<Dominio[]>('http://localhost:8081/v1//dominio/uf');
    }

    listarTiposMembro(){
        return this.httpClient.get<Dominio[]>('http://localhost:8081/v1//dominio/tipomembro');
    }

    listarSituacoesOficialato(){
        return this.httpClient.get<Dominio[]>('http://localhost:8081/v1//dominio/situacaooficialato');
    }

    listarTiposCadastroRol(){
        return this.httpClient.get<Dominio[]>('http://localhost:8081/v1//dominio/cadastrorol');
    }

    listarProcedencia(){
        return this.httpClient.get<Dominio[]>('http://localhost:8081/v1//dominio/procedencia');
    }

    listarMeiosAdmissao(){
        return this.httpClient.get<Dominio[]>('http://localhost:8081/v1//dominio/meioadmissao');
    }

    listarTiposAlocacao(){
        return this.httpClient.get<Dominio[]>('http://localhost:8081/v1//dominio/alocacao');
    }
}