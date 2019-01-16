import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UF } from '../dominio/model/uf';
import { Dominio } from '../dominio/model/dominio';
import { Profissao } from './model/profissao';
import { TipoTelefone } from './model/tipo-telefone';
import { Telefone } from './model/telefone';
import { DominioService } from '../dominio/service/dominio.service';
import { ConsultaCEPService } from '../cep/consulta-cep.service';
import { MembroService } from './service/membro.service';

export abstract class BaseCadastroMembroComponent implements OnInit{
    identificacaoFormGroup: FormGroup;
    informacoesResidenciaisFormGroup: FormGroup;
    emailFormGroup:FormGroup;
    telefonesFormGroup:FormGroup;
    listaEstados: UF[] = [];
    listaEscolaridades: Dominio[] = [];
    listaProfissoes: Profissao[] = [];
    listaEstadosCivis:Dominio[] = [];
    listaTiposTelefone:TipoTelefone[] = [];
    listaTelefones:Telefone[] = [];
    listaSexo: Dominio[];
    listaAlocacao: Dominio[];
    formBuilder: FormBuilder;
    dominioService: DominioService;
    consultaCEPService: ConsultaCEPService;
    membroService: MembroService;
    constructor(formBuilder: FormBuilder, 
        dominioService: DominioService,
        consultaCEPService: ConsultaCEPService,
        membroService: MembroService){
            this.formBuilder = formBuilder;
            this.dominioService = dominioService;
            this.consultaCEPService = consultaCEPService;
            this.membroService = membroService;
    }
    ngOnInit() {
        this.identificacaoFormGroup = this.formBuilder.group({
            cpf: ['', [Validators.required, Validators.maxLength(11)]],
            nome: ['', [Validators.required, Validators.maxLength(150)]],
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
            rua: ['', [Validators.required, Validators.maxLength]],
            numero: ['', [Validators.maxLength]],
            complemento: ['', [Validators.maxLength]],
            bairro: ['', [Validators.required, Validators.maxLength]],
            cidade: ['', [Validators.required, Validators.maxLength]],
            siglaUf: ['', [Validators.required, Validators.maxLength]],
            pontoReferencia: ['', [Validators.maxLength]]
        });
        this.emailFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.maxLength, Validators.email]]
        });
        this.telefonesFormGroup = this.formBuilder.group({
            ddd: ['', [Validators.maxLength(2)]],
            numero: ['', [Validators.maxLength(10)]],
            tipoTelefone: ['']
        });
        this.dominioService.listarSexo().subscribe(listaSexo =>{this.listaSexo = listaSexo});
        this.dominioService.listarAlocacao().subscribe(listaAlocacao =>{this.listaAlocacao = listaAlocacao});
        this.dominioService.listarEstados().subscribe(listaEstados => { this.listaEstados = listaEstados });
        this.dominioService.listarEscolaridades().subscribe(listaEscolaridades => {this.listaEscolaridades = listaEscolaridades});
        this.dominioService.listarProfissoes().subscribe(listaProfissoes =>{this.listaProfissoes = listaProfissoes});
        this.dominioService.listarEstadosCivis().subscribe(listaEstadosCivis =>{this.listaEstadosCivis = listaEstadosCivis});
        this.dominioService.listarTiposTelefone().subscribe(listaTiposTelefone =>{this.listaTiposTelefone = listaTiposTelefone});
        this.executaAcoesExpecificasFuncionalidade();
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
                    this.informacoesResidenciaisFormGroup.get('uf').setValue(resposta.uf);
                }
            );
    }

    abstract executaAcoesExpecificasFuncionalidade();

}