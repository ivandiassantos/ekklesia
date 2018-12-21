import { MascaraModule } from '../diretivas/mascara.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaMembrosComponent, DialogConfirmacaoExclusao } from './lista-membros.component';
import {MatRadioModule} from '@angular/material/radio';
import { MatCardModule, MatButtonModule, MatStepperModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatIconModule, MatTooltipModule, MatTableModule, MatMenuModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { CadastraMembroComponent } from './cadastra-membro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AlteraCadastroMembroComponent } from './altera-cadastro-membro-component';

@NgModule({
    imports: [
        CommonModule, 
        MatCardModule, 
        MatButtonModule,
        MatStepperModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        RouterModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatMenuModule,
        MascaraModule
    ],
    declarations: [
        ListaMembrosComponent, 
        CadastraMembroComponent,
        DialogConfirmacaoExclusao,
        AlteraCadastroMembroComponent
    ],
    exports:[
        ListaMembrosComponent, 
        CadastraMembroComponent,
        AlteraCadastroMembroComponent,
        DialogConfirmacaoExclusao
    ],
    entryComponents:[DialogConfirmacaoExclusao]
})
export class MembroModule{

}