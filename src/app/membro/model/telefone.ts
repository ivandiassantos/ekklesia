import { TipoTelefone } from './tipo-telefone';
export class Telefone{
    private _id:number;
    private _ddd:string;
    private _numero:string;
    private _tipoTelefone:TipoTelefone;

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter ddd
     * @return {string}
     */
	public get ddd(): string {
		return this._ddd;
	}

    /**
     * Getter numero
     * @return {string}
     */
	public get numero(): string {
		return this._numero;
	}

    /**
     * Getter tipoTelefone
     * @return {TipoTelefone}
     */
	public get tipoTelefone(): TipoTelefone {
		return this._tipoTelefone;
    }
    
}