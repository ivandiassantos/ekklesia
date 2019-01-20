import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ConsultaCEPService } from "../cep/consulta-cep.service";
import { DominioService } from "../dominio/service/dominio.service";
import { BaseCadastroMembroComponent } from "./base-cadastro-membro-component";
import { Endereco } from "./model/endereco";
import { Membro } from "./model/membro";
import { Telefone } from "./model/telefone";
import { MembroService } from "./service/membro.service";
import { MY_FORMATS } from "./cadastra-membro.component";
import { MembroBuilder } from "./builder/membro-builder";

@Component({
    templateUrl: './altera-cadastro-membro.component.html',
    providers: [

        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class AlteraCadastroMembroComponent extends BaseCadastroMembroComponent{
    identificacaoFormGroup:FormGroup;
    membro:Observable<Membro>;
    snackBar: MatSnackBar;
    listaTelefones: Telefone[] = [];
    idMembro: number;
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
                this.idMembro = membro.id;
                this.identificacaoFormGroup.get('cpf').setValue(membro.cpf);
                this.identificacaoFormGroup.get('nome').setValue(membro.nome);
                this.identificacaoFormGroup.get('dataNascimento').setValue(membro.dataNascimento);
                this.identificacaoFormGroup.get('sexo').setValue(membro.idSexo + '');
                this.identificacaoFormGroup.get('rg').setValue(membro.rg);
                this.identificacaoFormGroup.get('orgaoEmissor').setValue(membro.orgaoEmissor);
                this.identificacaoFormGroup.get('naturalidade').setValue(membro.naturalidade);
                this.identificacaoFormGroup.get('ufNaturalidade').setValue(membro.siglaUfNaturalidade);
                this.identificacaoFormGroup.get('escolaridade').setValue(membro.idEscolaridade + '');
                this.identificacaoFormGroup.get('profissao').setValue(membro.idProfissao+ '');
                this.identificacaoFormGroup.get('estadoCivil').setValue(membro.idEstadoCivil+ '');
                this.identificacaoFormGroup.get('alocacao').setValue(membro.idAlocacao+'');
                this.identificacaoFormGroup.get('informacaoAdicional').setValue(membro.informacaoAdicional);
                
                let endereco:Endereco = membro.enderecos[0];
                this.informacoesResidenciaisFormGroup.get('cep').setValue(endereco.cep);
                this.informacoesResidenciaisFormGroup.get('rua').setValue(endereco.rua);
                this.informacoesResidenciaisFormGroup.get('numero').setValue(endereco.numero);
                this.informacoesResidenciaisFormGroup.get('complemento').setValue(endereco.complemento);
                this.informacoesResidenciaisFormGroup.get('bairro').setValue(endereco.bairro);
                this.informacoesResidenciaisFormGroup.get('cidade').setValue(endereco.cidade);
                this.informacoesResidenciaisFormGroup.get('siglaUf').setValue(endereco.siglaUf);
                this.informacoesResidenciaisFormGroup.get('pontoReferencia').setValue(endereco.pontoReferencia);

                this.emailFormGroup.get('email').setValue('teste@teste.com.br');

                this.listaTelefones = membro.telefones;
            })
        );
        console.log('Membro:',this.membro);
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
        const endereco = this.informacoesResidenciaisFormGroup.getRawValue() as Endereco;
        const membro = new MembroBuilder()
            .nome(this.identificacaoFormGroup.get('nome').value)
            .cpf(this.identificacaoFormGroup.get('cpf').value)
            .dataNascimento(this.identificacaoFormGroup.get('dataNascimento').value)
            .sexo(this.identificacaoFormGroup.get('sexo').value)
            .rg(this.identificacaoFormGroup.get('rg').value)
            .orgaoEmissor(this.identificacaoFormGroup.get('orgaoEmissor').value)
            .naturalidade(this.identificacaoFormGroup.get('naturalidade').value)
            .ufNaturalidade(this.identificacaoFormGroup.get('ufNaturalidade').value)
            .escolaridade(this.identificacaoFormGroup.get('escolaridade').value)
            .profissao(this.identificacaoFormGroup.get('profissao').value)
            .estadoCivil(this.identificacaoFormGroup.get('estadoCivil').value)
            .informacaoAdicional(this.identificacaoFormGroup.get('informacaoAdicional').value)
            .alocacao(this.identificacaoFormGroup.get('alocacao').value)
            .dataNascimento(this.identificacaoFormGroup.get('dataNascimento').value)
            .endereco(endereco)
            .telefones(this.listaTelefones)
            .build();
        this.membroService.alterar(this.idMembro, membro)
        .subscribe(
            resposta => {
                this.snackBar.open('Dados cadastrados com sucesso.', '', {
                    duration: 4000,
                });
            },
            erro => {
                this.snackBar.open('Erro ao alterar os dados.', '', {
                    duration: 4000,
                });
            } 
        );
    }

}