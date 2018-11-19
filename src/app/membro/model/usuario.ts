export class Usuario{
   
    private _id:number;
    private _email:string;
    private _senha:string;

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter email
     * @return {string}
     */
	public get email(): string {
		return this._email;
	}

    /**
     * Getter senha
     * @return {string}
     */
	public get senha(): string {
		return this._senha;
	}
}