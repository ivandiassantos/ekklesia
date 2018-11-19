import { UF } from './uf';
import { Endereco } from './endereco';
import { Usuario } from './usuario';
import { Dominio } from './../../dominio/model/dominio';
import { Telefone } from './telefone';

export class CadastroBasico{
    private _id:number;
    private _nome:string;
    private _dataNascimento:Date;
    private _sexo:Dominio;
    private _cpf:string;
    private _rg:String;
    private _naturalidade:string;
    private _ufNaturalidade:UF;
    private _orgaoEmissor:string;
    private _escolaridade:Dominio;
    private _informacaoAdicional:string;
    private _alocacao:Dominio;
    private _profissao:Dominio;
    private _usuario:Usuario;
    private _estadoCivil:Dominio;
    private _telefones:Telefone[];
    private _enderecos:Endereco[];


    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter nome
     * @return {string}
     */
	public get nome(): string {
		return this._nome;
	}

    /**
     * Getter dataNascimento
     * @return {Date}
     */
	public get dataNascimento(): Date {
		return this._dataNascimento;
	}

    /**
     * Getter sexo
     * @return {Dominio}
     */
	public get sexo(): Dominio {
		return this._sexo;
	}

    /**
     * Getter cpf
     * @return {string}
     */
	public get cpf(): string {
		return this._cpf;
	}

    /**
     * Getter rg
     * @return {String}
     */
	public get rg(): String {
		return this._rg;
	}

    /**
     * Getter naturalidade
     * @return {string}
     */
	public get naturalidade(): string {
		return this._naturalidade;
	}

    /**
     * Getter ufNaturalidade
     * @return {Dominio }
     */
	public get ufNaturalidade(): UF  {
		return this._ufNaturalidade;
	}

    /**
     * Getter orgaoEmissor
     * @return {string}
     */
	public get orgaoEmissor(): string {
		return this._orgaoEmissor;
	}

    /**
     * Getter escolaridade
     * @return {Dominio}
     */
	public get escolaridade(): Dominio {
		return this._escolaridade;
	}

    /**
     * Getter informacaoAdicional
     * @return {string}
     */
	public get informacaoAdicional(): string {
		return this._informacaoAdicional;
	}

    /**
     * Getter alocacao
     * @return {Dominio}
     */
	public get alocacao(): Dominio {
		return this._alocacao;
	}

    /**
     * Getter profissao
     * @return {Dominio}
     */
	public get profissao(): Dominio {
		return this._profissao;
	}

    /**
     * Getter usuario
     * @return {Usuario}
     */
	public get usuario(): Usuario {
		return this._usuario;
	}

    /**
     * Getter estadoCivil
     * @return {Dominio}
     */
	public get estadoCivil(): Dominio {
		return this._estadoCivil;
	}

    /**
     * Getter telefones
     * @return {Telefone[]}
     */
	public get telefones(): Telefone[] {
		return this._telefones;
	}

    /**
     * Getter enderecos
     * @return {Endereco[]}
     */
	public get enderecos(): Endereco[] {
		return this._enderecos;
    }
    
}