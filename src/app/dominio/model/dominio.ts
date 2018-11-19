export class Dominio{
    private _id: number;
    private _descricao:string;

    public get id() : number {
        return this._id; 
    }

    public get descricao() : string {
        return this._descricao; 
    }
    
}