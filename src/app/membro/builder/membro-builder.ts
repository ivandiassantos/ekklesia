import { Membro } from '../model/membro';
import { Endereco } from '../model/endereco';
import { Telefone } from '../model/telefone';

export class MembroBuilder{
    private _cpf:string;
    private _nome:string;
    private _dataNascimento: Date;
    private _sexo: number;
    private _rg: string;
    private _listaTelefones: Telefone[] = [];
    private _enderecos: Endereco[] = [];
    private _alocacao: number;
    private _informacaoAdicional: string;
    private _estadoCivil: number;
    private _profissao: number;
    private _escolaridade: number;
    private _ufNaturalidade: string;
    private _naturalidade: string;
    private _orgaoEmissor: string;

    telefones(listaTelefones: Telefone[]) {
        this._listaTelefones = listaTelefones;
        return this;
    }

    endereco(endereco: Endereco) {
        this._enderecos.push(endereco);
        return this;
    }

    alocacao(alocacao: number){
        this._alocacao = alocacao;
        return this;
    }

    informacaoAdicional(informacaoAdicional: string){
        this._informacaoAdicional = informacaoAdicional;
        return this;
    }

    estadoCivil(estadoCivil: number){
        this._estadoCivil = estadoCivil;
        return this;
    }
    profissao(profissao: number) {
        this._profissao = profissao;
        return this;
    }

    escolaridade(escolaridade: number) {
        this._escolaridade = escolaridade;
        return this;
    }

    ufNaturalidade(ufNaturalidade: string) {
        this._ufNaturalidade = ufNaturalidade;
        return this;
    }

    naturalidade(naturalidade: string) {
        this._naturalidade = naturalidade;
        return this;
    }

    orgaoEmissor(orgaoEmissor: string){
        this._orgaoEmissor = orgaoEmissor;
        return this;
    }

    rg(rg: string) {
        this._rg = rg;
        return this;
    }
    
    cpf(cpf: string) {
        this._cpf = cpf;
        return this;
    }

    nome(nome: string) {
        this._nome = nome;
        return this;
    }

    dataNascimento(dataNascimento: Date) {
        this._dataNascimento = dataNascimento;
        return this;
    }

    sexo(sexo: number){
        this._sexo = sexo;
        return this;
    }

    build(){
        return new Membro(this._nome, this._cpf, this._dataNascimento, this._sexo, 
            this._rg, this._listaTelefones, this._enderecos, this._alocacao, 
            this._informacaoAdicional, this._estadoCivil, this._profissao, this._escolaridade,
            this._ufNaturalidade, this._naturalidade, this._orgaoEmissor);
    }
}