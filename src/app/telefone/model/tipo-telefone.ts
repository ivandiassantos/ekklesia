export class TipoTelefone{
    private _id:number;
    private _descricao:string;

    constructor(id:number, descricao:string){
        this._id = id;
        this._descricao = descricao;
    }
    
    public get id() : number {
        return this._id;
    }

    
    public get descricao() : string {
        return this._descricao; 
    }
    
    
}