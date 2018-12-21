import { TipoTelefone } from './tipo-telefone';
export class Telefone{
    private _id: number;
    private _tipoTelefone: TipoTelefone;
    private _ddd: string;
    private _numero: string;

    public get id(): number {
        return this._id;
    }
    public get ddd(): string {
        return this._ddd;
    }
    public set ddd(value: string) {
        this._ddd = value;
    }
    public get numero(): string {
        return this._numero;
    }
    public set numero(value: string) {
        this._numero = value;
    }
    public get tipoTelefone(): TipoTelefone {
        return this._tipoTelefone;
    }
    public set tipoTelefone(value: TipoTelefone) {
        this._tipoTelefone = value;
    }

    
}