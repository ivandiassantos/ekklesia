import { OnInit, Component } from "@angular/core";
import {Validators, FormGroup,  FormBuilder} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Membro } from "./model/membro";
import { MembroService } from "./service/membro.service";
import { MatSnackBar } from "@angular/material";
import { BaseCadastroMembroComponent } from "./base-cadastro-membro-component";
import { ConsultaCEPService } from "../cep/consulta-cep.service";
import { DominioService } from "../dominio/service/dominio.service";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
    templateUrl: './altera-cadastro-membro.component.html'
})
export class AlteraCadastroMembroComponent extends BaseCadastroMembroComponent{
    identificacaoFormGroup:FormGroup;
    membro:Observable<Membro>;
    snackBar: MatSnackBar;
    constructor(private route:ActivatedRoute, 
        membroService:MembroService,
        snackBar: MatSnackBar,
        formBuilder:FormBuilder,
        dominioService:DominioService,
        consultaCEPService:ConsultaCEPService){
        super(formBuilder, dominioService, consultaCEPService, membroService);
        this.snackBar = snackBar;
    }
    executaAcoesExpecificasFuncionalidade() {
        this.membro = this.membroService.obterPor(this.route.snapshot.params.idMembro).pipe(
            tap(membro => {
                debugger;
                this.identificacaoFormGroup.get('cpf').setValue(membro.cpf);
                this.identificacaoFormGroup.get('nome').setValue(membro.nome);
                this.identificacaoFormGroup.get('sexo').setValue(membro.sexo);
            })
        );
        
    }

}