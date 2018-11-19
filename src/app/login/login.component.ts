import { AutenticacaoService } from './../autenticacao/service/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup
  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private autenticacaoService:AutenticacaoService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      login: ['', [Validators.required, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.maxLength(30)]]
    })
  }

  autenticar() {

    this.autenticacaoService.autenticar
    (this.formLogin.get('login').value, this.formLogin.get('senha').value)
    .subscribe(
      () => this.router.navigate(['/lista-membros']),
      erro =>{
        // this.router.navigate(['/lista-membros']);
        console.log(erro);
        this.formLogin.reset();
        this.snackBar.open('Login e/ou senha inválido(s)','', {
          duration: 4000,
        });
      }
    );
    
  }

}
