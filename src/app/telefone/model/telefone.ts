import { TipoTelefone } from './tipo-telefone';

export class Telefone{
    private _id:number;
    private _ddd:string;
    private _numero:string;
    private _tipoTelefone:TipoTelefone;

    constructor(ddd:string, numero:string, tipoTelefone:TipoTelefone){
        this._ddd = ddd;
        this._numero = numero;
        this._tipoTelefone = tipoTelefone;
    }
    
    public get id() : number {
        return this._id;
    }

    public get ddd() : string {
        return this._ddd;
    }
    
    public get numero() : string {
        return this._numero;
    }
    
    public get tipoTelefone() : TipoTelefone {
        return this._tipoTelefone; 
    }
    
}