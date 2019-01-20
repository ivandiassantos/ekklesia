import { Endereco } from './endereco';
import { Usuario } from './usuario';
import { Telefone } from './telefone';

export class Membro{
    id:number;
    nome:string;
    dataNascimento:Date;
    idSexo:number;
    cpf:string;
    rg:String;
    naturalidade:string;
    siglaUfNaturalidade:string;
    orgaoEmissor:string;
    idEscolaridade:number;
    informacaoAdicional:string;
    idAlocacao:number;
    idProfissao:number;
    usuario:Usuario;
    idEstadoCivil:number;
    telefones:Telefone[] = [];
    enderecos:Endereco[] = [];

    constructor(nome:string, cpf:string, dataNascimento:Date, idSexo:number, rg:string, 
        telefones:Telefone[], enderecos:Endereco[], idAlocacao:number, informacaoAdicional:string, 
        idEstadoCivil:number, idProfissao:number, idEscolaridade:number, siglaUfNaturalidade:string, naturalidade:string, 
        orgaoEmissor:string){
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.idSexo = idSexo;
        this.rg = rg;
        this.telefones = telefones;
        this.enderecos = enderecos;
        this.idAlocacao = idAlocacao;
        this.informacaoAdicional = informacaoAdicional;
        this.idEstadoCivil = idEstadoCivil;
        this.idProfissao = idProfissao;
        this.idEscolaridade = idEscolaridade;
        this.siglaUfNaturalidade = siglaUfNaturalidade;
        this.naturalidade = naturalidade;
        this.orgaoEmissor = orgaoEmissor;
    }
    
}