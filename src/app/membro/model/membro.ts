import { Endereco } from './endereco';
import { Usuario } from './usuario';
import { Telefone } from './telefone';

export class Membro{

    id:number;
    nome:string;
    dataNascimento:Date;
    sexo:number;
    cpf:string;
    rg:String;
    naturalidade:string;
    ufNaturalidade:string;
    orgaoEmissor:string;
    escolaridade:number;
    informacaoAdicional:string;
    alocacao:number;
    profissao:number;
    usuario:Usuario;
    estadoCivil:number;
    telefones:Telefone[] = [];
    enderecos:Endereco[] = [];

    constructor(nome:string, cpf:string, dataNascimento:Date, sexo:number, rg:string, 
        telefones:Telefone[], enderecos:Endereco[], alocacao:number, informacaoAdicional:string, 
        estadoCivil:number, profissao:number, escolaridade:number, ufNaturalidade:string, naturalidade:string, 
        orgaoEmissor:string){
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.sexo = sexo;
        this.rg = rg;
        this.telefones = telefones;
        this.enderecos = enderecos;
        this.alocacao = alocacao;
        this.informacaoAdicional = informacaoAdicional;
        this.estadoCivil = estadoCivil;
        this.profissao = profissao;
        this.escolaridade = escolaridade;
        this.ufNaturalidade = ufNaturalidade;
        this.naturalidade = naturalidade;
        this.orgaoEmissor = orgaoEmissor;
    }
    
}