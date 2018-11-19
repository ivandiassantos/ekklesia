import { UF } from './uf';
export class Endereco{
    
    private _id:number;
    private _cep:string;
    private _numero:string;
    private _rua:string;
    private _complemento:string ;
    private _pontoReferencia:string;
    private _uf:UF;
    private _cidade:string;
    private _bairro:string;


    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter cep
     * @return {string}
     */
	public get cep(): string {
		return this._cep;
	}

    /**
     * Getter numero
     * @return {string}
     */
	public get numero(): string {
		return this._numero;
	}

    /**
     * Getter rua
     * @return {string}
     */
	public get rua(): string {
		return this._rua;
	}

    /**
     * Getter complemento
     * @return {string }
     */
	public get complemento(): string  {
		return this._complemento;
	}

    /**
     * Getter pontoReferencia
     * @return {string}
     */
	public get pontoReferencia(): string {
		return this._pontoReferencia;
	}

    /**
     * Getter uf
     * @return {UF}
     */
	public get uf(): UF {
		return this._uf;
	}

    /**
     * Getter cidade
     * @return {string}
     */
	public get cidade(): string {
		return this._cidade;
	}

    /**
     * Getter bairro
     * @return {string}
     */
	public get bairro(): string {
		return this._bairro;
	}
    
}