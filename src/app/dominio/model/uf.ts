export class UF{
    private _id: number;
    private _sigla:string;
    private _descricao:string;
    
    public get id() : number {
        return this._id;
    }

    public get sigla() : string {
        return this._sigla; 
    }
    
    
    public get descricao() : string {
        return this._descricao;
    }
      
}