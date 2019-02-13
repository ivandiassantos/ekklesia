import { Component, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { Membro } from './model/membro';
import { MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { merge, of, Observable } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { MembroService } from './service/membro.service';

@Component({
    templateUrl: './lista-membros.component.html'
})
export class ListaMembrosComponent implements AfterViewInit {
    colunas: string[] = ['nome', 'cpf', 'acoes'];
    membrosDataSource: Membro[] = [];
    totalDeItens:Observable<number>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private membroService:MembroService, public dialog: MatDialog){
    }
    
    ngAfterViewInit(){
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            startWith({}),
            switchMap(() => {
                console.log('Page size ',this.paginator.pageSize);
                console.log('Page index ',this.paginator.pageIndex);
                return this.membroService.listar(this.paginator.pageIndex, this.paginator.pageSize);
            }),
            map(data => {
                this.totalDeItens = this.membroService.totalDeMembrosCadastrados();
                console.log('resposta: ', data);
                return data;
            }),
            catchError(() => {
                return of([]);
            })
      ).subscribe(data => this.membrosDataSource = data);
    }
    
    solicitaConfirmacaoDeExclusao(membro:Membro){
        console.log('membro: ', membro);
        const dialogRef = this.dialog.open(DialogConfirmacaoExclusao, {
            width: '250px',
            data: membro
          });
    }
}

@Component({
    selector: 'solicita-confirmacao-exclusao.component',
    templateUrl: 'solicita-confirmacao-exclusao.component.html',
  })
  export class DialogConfirmacaoExclusao {
  
    constructor(
      public dialogRef: MatDialogRef<DialogConfirmacaoExclusao>,
      @Inject(MAT_DIALOG_DATA) public data: Membro,
      private membroService:MembroService,
      private snackBar:MatSnackBar) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    excluirMembro(){
        console.log(this.data);
        this.membroService.excluir(this.data.id).subscribe(
            resposta => {
                this.snackBar.open('Exclusão realizada com sucesso.', '', {
                    duration: 4000,
                });
            },
            erro => {
                this.snackBar.open('Erro ao realizar a exclusão.', '', {
                    duration: 4000,
                });
            }
        );
        this.dialogRef.close();
    }

  
}

export interface DialogData {
    
}