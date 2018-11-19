import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    armazena(token: string) {
        window.localStorage.setItem('token',token);
    }

    remove() {
        window.localStorage.removeItem('token');
    }

    obtem() {
        console.log(localStorage.getItem('token'));
        return window.localStorage.getItem('token');
    }

    existe(){
        return !!this.obtem();
    }
}