export class UF{
    private _id:number;
    private _sigla:string;
    private _descricao:string;

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter sigla
     * @return {string}
     */
	public get sigla(): string {
		return this._sigla;
	}

    /**
     * Getter descricao
     * @return {string}
     */
	public get descricao(): string {
		return this._descricao;
	}

}