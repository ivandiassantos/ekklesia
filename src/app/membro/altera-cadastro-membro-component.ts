import { OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MembroService } from "./service/membro.service";
import { Membro } from "./model/membro";
import { MatSnackBar } from "@angular/material";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
    templateUrl: './altera-cadastro-membro.component.html'
})
export class AlteraCadastroMembroComponent implements OnInit {
    membro:Observable<Membro>;
    identificacaoFormGroup: FormGroup;
    constructor(private route: ActivatedRoute,
        private membroService: MembroService,
        private snackBar: MatSnackBar,
        private formBuilder:FormBuilder) {

    }
    ngOnInit() {
        this.identificacaoFormGroup = this.formBuilder.group({
            cpf: ['', [Validators.required, Validators.maxLength(11)]],
            nome: ['', [Validators.required, Validators.maxLength(150)]]
        });
        this.membro = this.membroService.obterPor(this.route.snapshot.params.idMembro).pipe(
            tap(membro => {
                this.identificacaoFormGroup.get('cpf').setValue(membro.cpf);
                this.identificacaoFormGroup.get('nome').setValue(membro.nome);
            })
        );
    }

}