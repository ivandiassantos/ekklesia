import { Membro } from '../model/membro';
import { Endereco } from '../model/endereco';
import { Telefone } from '../model/telefone';
import { Moment } from 'moment';

export class MembroBuilder{
    private _cpf:string;
    private _nome:string;
    private _dataNascimento: Date;
    private _idSexo: number;
    private _rg: string;
    private _listaTelefones: Telefone[] = [];
    private _enderecos: Endereco[] = [];
    private _idAlocacao: number;
    private _informacaoAdicional: string;
    private _idEstadoCivil: number;
    private _idProfissao: number;
    private _idEscolaridade: number;
    private _siglaUfNaturalidade: string;
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

    alocacao(idAlocacao: number){
        this._idAlocacao = idAlocacao;
        return this;
    }

    informacaoAdicional(informacaoAdicional: string){
        this._informacaoAdicional = informacaoAdicional;
        return this;
    }

    estadoCivil(idEstadoCivil: number){
        this._idEstadoCivil = idEstadoCivil;
        return this;
    }
    profissao(idProfissao: number) {
        this._idProfissao = idProfissao;
        return this;
    }

    escolaridade(idEscolaridade: number) {
        this._idEscolaridade = idEscolaridade;
        return this;
    }

    ufNaturalidade(siglaUfNaturalidade: string) {
        this._siglaUfNaturalidade = siglaUfNaturalidade;
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

    dataNascimento(dataNascimento: Moment) {
        if(dataNascimento !== null){
            this._dataNascimento = new Date(dataNascimento.format('YYYY-MM-DD'));
        }
        return this;
    }

    sexo(idSexo: number){
        this._idSexo = idSexo;
        return this;
    }

    build(){
        return new Membro(this._nome, this._cpf, this._dataNascimento, this._idSexo, 
            this._rg, this._listaTelefones, this._enderecos, this._idAlocacao, 
            this._informacaoAdicional, this._idEstadoCivil, this._idProfissao, this._idEscolaridade,
            this._siglaUfNaturalidade, this._naturalidade, this._orgaoEmissor);
    }
}