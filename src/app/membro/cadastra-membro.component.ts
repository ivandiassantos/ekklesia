import { MatSnackBar } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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
import { Membro } from './model/membro';
import { Endereco } from './model/endereco';
import { MembroBuilder } from './builder/membro-builder';
import { Router } from '@angular/router';

@Component({
    templateUrl: './cadastra-membro.component.html'
})
export class CadastraMembroComponent implements OnInit {
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

    constructor(private formBuilder: FormBuilder,
        private dominioService: DominioService,
        private consultaCEPService: ConsultaCEPService,
        private membroService: MembroService,
        private snackBar: MatSnackBar,
        private router: Router) { }

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
            uf: ['', [Validators.required, Validators.maxLength]],
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

    adicionarTelefone(){
        let telefone = this.telefonesFormGroup.getRawValue() as Telefone;
        let codigoTipoTelefone = parseInt(this.telefonesFormGroup.get('tipoTelefone').value);
        this.listaTiposTelefone.forEach(tipo => {
            if(tipo.id === codigoTipoTelefone)
                telefone.tipoTelefone = tipo;
        });
        this.listaTelefones.push(telefone);
    }

    editarTelefone(telefone){
        this.telefonesFormGroup.get('tipoTelefone').setValue(telefone.tipoTelefone.id+'');
        this.telefonesFormGroup.get('ddd').setValue(telefone.ddd);
        this.telefonesFormGroup.get('numero').setValue(telefone.numero);
        this.listaTelefones.splice(telefone, 1);
    }

    excluirTelefone(telefone){
        this.listaTelefones.splice(telefone, 1);
    }

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        console.log('Evento: '+type, event.value);   
    }
}