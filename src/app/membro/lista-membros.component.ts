import { MembroService } from './service/membro.service';
import { CadastroBasico } from './model/cadastro-basico';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
    templateUrl: './lista-membros.component.html'
})
export class ListaMembrosComponent implements OnInit {
    displayedColumns: string[] = ['cpf', 'nome', 'acoes'];
    listaMembrosDataSource: MatTableDataSource<CadastroBasico>;
    listaMembros: CadastroBasico[] = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private membroService: MembroService) {
        this.membroService.listar().subscribe(listaMembros => { this.listaMembros = listaMembros });
        this.listaMembrosDataSource = new MatTableDataSource(this.listaMembros);
    }
    ngOnInit() {

    }

    aplicarFiltro(filtro: string) {
        this.listaMembrosDataSource.filter = filtro.trim().toLowerCase();
    
        if (this.listaMembrosDataSource.paginator) {
          this.listaMembrosDataSource.paginator.firstPage();
        }
      }
}