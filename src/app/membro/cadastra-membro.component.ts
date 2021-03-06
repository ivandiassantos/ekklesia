import { MatSnackBar } from '@angular/material';
import { MembroService } from './service/membro.service';
import { ConsultaCEPService } from './../cep/consulta-cep.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DominioService } from '../dominio/service/dominio.service';
import { Dominio } from '../dominio/model/dominio';
import { UF } from '../dominio/model/uf';
import { Profissao } from './model/profissao';
import { TipoTelefone } from './model/tipo-telefone';
import { Telefone } from './model/telefone';
import { Endereco } from './model/endereco';
import { MembroBuilder } from './builder/membro-builder';
import { Router } from '@angular/router';
import { BaseCadastroMembroComponent } from './base-cadastro-membro-component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import * as _moment from 'moment';
import { defaultFormatUtc as _rollupMoment } from 'moment';
import 'moment/locale/pt-br';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    templateUrl: './cadastra-membro.component.html',
    providers: [

        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class CadastraMembroComponent extends BaseCadastroMembroComponent {
    identificacaoFormGroup: FormGroup;
    informacoesResidenciaisFormGroup: FormGroup;
    emailFormGroup: FormGroup;
    telefonesFormGroup: FormGroup;
    listaEstados: UF[] = [];
    listaEscolaridades: Dominio[] = [];
    listaProfissoes: Profissao[] = [];
    listaEstadosCivis: Dominio[] = [];
    listaTiposTelefone: TipoTelefone[] = [];
    listaTelefones: Telefone[] = [];
    listaSexo: Dominio[];
    listaAlocacao: Dominio[];
    snackBar: MatSnackBar;
    router: Router;

    constructor(snackBar: MatSnackBar,
        router: Router,
        formBuilder: FormBuilder,
        dominioService: DominioService,
        consultaCEPService: ConsultaCEPService,
        membroService: MembroService) {
        super(formBuilder, dominioService, consultaCEPService, membroService);
        this.snackBar = snackBar;
        this.router = router;
    }

    executaAcoesExpecificasFuncionalidade() {
        //Não utilizado neste cenário.
    }

    salvar() {
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

        this.membroService.cadastrar(membro).subscribe(
            resposta => {
                this.router.navigate(['/lista-membros']);
                this.snackBar.open('Dados cadastrados com sucesso.', '', {
                    duration: 4000,
                });
            },
            erro => {
                this.snackBar.open('Erro ao cadastrar os dados.', '', {
                    duration: 4000,
                });
            }
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

    change(dateEvent) {
        console.log(dateEvent.value);
    }
}