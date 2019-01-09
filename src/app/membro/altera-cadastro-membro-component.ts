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
import { Endereco } from "./model/endereco";
import { Telefone } from "./model/telefone";

@Component({
    templateUrl: './altera-cadastro-membro.component.html'
})
export class AlteraCadastroMembroComponent extends BaseCadastroMembroComponent{
    identificacaoFormGroup:FormGroup;
    membro:Observable<Membro>;
    snackBar: MatSnackBar;
    listaTelefones: Telefone[] = [];
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
                this.identificacaoFormGroup.get('cpf').setValue(membro.cpf);
                this.identificacaoFormGroup.get('nome').setValue(membro.nome);
                this.identificacaoFormGroup.get('sexo').setValue(membro.sexo + '');
                this.identificacaoFormGroup.get('rg').setValue(membro.rg);
                this.identificacaoFormGroup.get('orgaoEmissor').setValue(membro.orgaoEmissor);
                this.identificacaoFormGroup.get('naturalidade').setValue(membro.naturalidade);
                this.identificacaoFormGroup.get('ufNaturalidade').setValue(membro.ufNaturalidade);
                this.identificacaoFormGroup.get('escolaridade').setValue(membro.escolaridade + '');
                this.identificacaoFormGroup.get('profissao').setValue(membro.profissao+ '');
                this.identificacaoFormGroup.get('estadoCivil').setValue(membro.estadoCivil+ '');
                this.identificacaoFormGroup.get('alocacao').setValue(membro.alocacao+'');
                this.identificacaoFormGroup.get('informacaoAdicional').setValue(membro.informacaoAdicional);
                
                let endereco:Endereco = membro.enderecos[0];
                this.informacoesResidenciaisFormGroup.get('cep').setValue(endereco.cep);
                this.informacoesResidenciaisFormGroup.get('rua').setValue(endereco.rua);
                this.informacoesResidenciaisFormGroup.get('numero').setValue(endereco.numero);
                this.informacoesResidenciaisFormGroup.get('complemento').setValue(endereco.complemento);
                this.informacoesResidenciaisFormGroup.get('bairro').setValue(endereco.bairro);
                this.informacoesResidenciaisFormGroup.get('cidade').setValue(endereco.cidade);
                this.informacoesResidenciaisFormGroup.get('uf').setValue(endereco.uf);
                this.informacoesResidenciaisFormGroup.get('pontoReferencia').setValue(endereco.pontoReferencia);

                this.emailFormGroup.get('email').setValue('teste@teste.com.br');

                this.listaTelefones = membro.telefones;
            })
        );
        
    }

    adicionarTelefone() {
        let telefone = this.telefonesFormGroup.getRawValue() as Telefone;
        let codigoTipoTelefone = parseInt(this.telefonesFormGroup.get('tipoTelefone').value);
        this.listaTiposTelefone.forEach(tipo => {
            if (tipo.id === codigoTipoTelefone)
                telefone.tipoTelefone = tipo;
        });
        this.listaTelefones.push(telefone);
    }

    editarTelefone(telefone) {
        this.telefonesFormGroup.get('tipoTelefone').setValue(telefone.tipoTelefone.id + '');
        this.telefonesFormGroup.get('ddd').setValue(telefone.ddd);
        this.telefonesFormGroup.get('numero').setValue(telefone.numero);
        this.listaTelefones.splice(telefone, 1);
    }

    excluirTelefone(telefone) {
        this.listaTelefones.splice(telefone, 1);
    }

    alterar(){
        // this.membroService.alterar()
        // .subscribe(
        //     resposta => {
        //         this.snackBar.open('Dados cadastrados com sucesso.', '', {
        //             duration: 4000,
        //         });
        //     },
        //     erro => {
        //         this.snackBar.open('Erro ao alterar os dados.', '', {
        //             duration: 4000,
        //         });
        //     } 
        // );
    }

}