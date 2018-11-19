import { MascaraModule } from './../diretivas/mascara.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListaMembrosComponent } from './lista-membros.component';
import { MatCardModule, MatButtonModule, MatStepperModule, MatInputModule, MatRadioModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatIconModule, MatTooltipModule, MatTableModule, MatMenuModule, MatPaginatorModule } from "@angular/material";
import { CadastraMembroComponent } from "./cadastra-membro.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { CdkTableModule } from "@angular/cdk/table";

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
        MatMenuModule,
        MatPaginatorModule,
        MascaraModule
    ],
    declarations: [
        ListaMembrosComponent, 
        CadastraMembroComponent
    ],
    exports:[
        ListaMembrosComponent, 
        CadastraMembroComponent
    ]
})
export class MembroModule{

}