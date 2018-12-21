export class Usuario{
   
    private _username:string;
    private _password:string;
    private _grant_type:string;

    constructor(username:string){
        this._username = username;
    }

    public get username(): string {
		return this._username;
	}

    public get password(): string {
		return this._password;
    }
    
    public get grant_type(): string {
		return this._grant_type;
	}
}