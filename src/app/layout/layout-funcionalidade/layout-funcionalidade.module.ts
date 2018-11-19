import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutFuncionalidadeComponent } from './layout-funcionalidade.component';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatMenuModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    FlexLayoutModule
  ],
  declarations: [LayoutFuncionalidadeComponent]
})
export class LayoutFuncionalidadeModule { }
