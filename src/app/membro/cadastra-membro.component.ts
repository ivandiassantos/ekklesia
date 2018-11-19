import { MatSnackBar } from '@angular/material';
import { MembroService } from './service/membro.service';
import { CadastroBasico } from './model/cadastro-basico';
import { TipoTelefone } from './../telefone/model/tipo-telefone';
import { Telefone } from './../telefone/model/telefone';
import { CEP } from './../cep/cep';
import { ConsultaCEPService } from './../cep/consulta-cep.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DominioService } from "../dominio/service/dominio.service";
import { Dominio } from "../dominio/model/dominio";

@Component({
    templateUrl: './cadastra-membro.component.html'
})
export class CadastraMembroComponent implements OnInit {
    identificacaoFormGroup: FormGroup;
    identidadeEclesiasticaFormGroup: FormGroup;
    admissaoFormGroup: FormGroup;
    profissaoDeFeFormGroup: FormGroup;
    informacoesResidenciaisFormGroup: FormGroup;
    familiaFormGroup: FormGroup;
    alocacaoFormGroup: FormGroup;
    formasDeContatoFormGroup: FormGroup;
    listaSexo: Dominio[] = [];
    listaEstadosCivis: Dominio[] = [];
    listaEstados: Dominio[] = [];
    listaEscolaridades: Dominio[] = [];
    listaTiposMembro: Dominio[] = [];
    listaSituacoesOficialato: Dominio[] = [];
    listaTiposCadastroRol: Dominio[] = [];
    listaProcedencia: Dominio[] = [];
    listaMeiosAdmissao: Dominio[] = [];
    listaTiposAlocacao: Dominio[] = [];

    constructor(private formBuilder: FormBuilder,
        private dominioService: DominioService,
        private consultaCEPService: ConsultaCEPService,
        private membroService: MembroService,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.identificacaoFormGroup = this.formBuilder.group({
            cpf: ['', [Validators.required, Validators.maxLength(11)]],
            nomeCompleto: ['', [Validators.required, Validators.maxLength(150)]],
            dataNascimento: [''],
            sexo: [''],
            rg: ['', [Validators.maxLength(15)]],
            orgaoEmissor: ['', [Validators.maxLength(10)]],
            naturalidade: ['', [Validators.maxLength(150)]],
            ufNaturalidade: [''],
            escolaridade: [''],
            profissao: [''],
            estadoCivil: [''],
            informacaoAdicional: ['', [Validators.maxLength(500)]],
            alocacao: ['']
        });
        this.informacoesResidenciaisFormGroup = this.formBuilder.group({
            cep: ['', [Validators.required, Validators.maxLength]],
            endereco: ['', [Validators.required, Validators.maxLength]],
            numero: ['', [Validators.maxLength]],
            complemento: ['', [Validators.maxLength]],
            bairro: ['', [Validators.required, Validators.maxLength]],
            cidade: ['', [Validators.required, Validators.maxLength]],
            estado: ['', [Validators.required, Validators.maxLength]],
            pontoReferencia: ['', [Validators.maxLength]]
        });
        this.formasDeContatoFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.maxLength, Validators.email]],
            dddTelefone: ['', [Validators.required, Validators.maxLength]],
            numeroTelefone: ['', [Validators.required, Validators.maxLength]],
            tipoTelefone: ['', [Validators.required]]
        });
        // this.identidadeEclesiasticaFormGroup = this.formBuilder.group({});
        // this.admissaoFormGroup = this.formBuilder.group({});
        // this.profissaoDeFeFormGroup = this.formBuilder.group({});
        // this.familiaFormGroup = this.formBuilder.group({});
        // this.alocacaoFormGroup = this.formBuilder.group({});

        // this.dominioService.listarSexos().subscribe(listaSexo => {this.listaSexo = listaSexo});
        // this.dominioService.listarEstadosCivis().subscribe(listaEstadosCivis => {this.listaEstadosCivis = listaEstadosCivis});
        this.dominioService.listarEstados().subscribe(listaEstados => { this.listaEstados = listaEstados });
        // this.dominioService.listarEscolaridades().subscribe(listaEscolaridades => {this.listaEscolaridades = listaEscolaridades});
        // this.dominioService.listarTiposMembro().subscribe(listaTiposMembro => {this.listaTiposMembro = listaTiposMembro});
        // this.dominioService.listarSituacoesOficialato().subscribe(listaSituacoesOficialato => {this.listaSituacoesOficialato = listaSituacoesOficialato});
        // this.dominioService.listarTiposCadastroRol().subscribe(listaTiposCadastroRol => {this.listaTiposCadastroRol = listaTiposCadastroRol});
        // this.dominioService.listarProcedencia().subscribe(listaProcedencia => {this.listaProcedencia = listaProcedencia});
        // this.dominioService.listarMeiosAdmissao().subscribe(listaMeiosAdmissao => {this.listaMeiosAdmissao = listaMeiosAdmissao});
        //this.dominioService.listarTiposAlocacao().subscribe(listaTiposAlocacao => {this.listaTiposAlocacao = listaTiposAlocacao});
    }

    consultaCEP() {
        let cep = this.informacoesResidenciaisFormGroup.get('cep').value;
        this.consultaCEPService.consultar(cep)
            .subscribe(
                resposta => {
                    this.informacoesResidenciaisFormGroup.get('endereco').setValue(resposta.logradouro);
                    this.informacoesResidenciaisFormGroup.get('complemento').setValue(resposta.complemento);
                    this.informacoesResidenciaisFormGroup.get('bairro').setValue(resposta.bairro);
                    this.informacoesResidenciaisFormGroup.get('cidade').setValue(resposta.localidade);
                    this.informacoesResidenciaisFormGroup.get('estado').setValue(resposta.uf);
                }
            );
    }

    salvar() {
        let cadastroBasico = this.identificacaoFormGroup.getRawValue() as CadastroBasico;
        this.membroService.cadastrar(cadastroBasico).subscribe(
            resposta => {
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

        console.log(cadastroBasico);
    }

}