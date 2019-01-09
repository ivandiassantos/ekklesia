import { UF } from 'src/app/dominio/model/uf';

export class Endereco{
    
    id:number;
    cep:string;
    numero:string;
    rua:string;
    complemento:string ; 
    pontoReferencia:string;
    uf:string;
    cidade:string;
    bairro:string;
    
}