import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutLoginComponent } from './layout/layout-login/layout-login.component';
import { LoginComponent } from './login/login.component';
import { LayoutFuncionalidadeComponent } from './layout/layout-funcionalidade/layout-funcionalidade.component';
import { ListaMembrosComponent } from './membro/lista-membros.component';
import { CadastraMembroComponent } from './membro/cadastra-membro.component';
import { AlteraCadastroMembroComponent } from './membro/altera-cadastro-membro-component';

const routes: Routes = [
  {
    path: '',
    component: LayoutLoginComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
   {
     path: '',
     component: LayoutFuncionalidadeComponent,
     children: [
       {
         path: 'lista-membros',
         component: ListaMembrosComponent
       }
     ]
   },
   {
     path: '',
     component: LayoutFuncionalidadeComponent,
     children: [
       {
         path: 'cadastra-membro',
         component: CadastraMembroComponent
       }
     ]
   },
   {
     path: '',
     component: LayoutFuncionalidadeComponent,
     children:[
       {
         path:'altera-cadastro-membro/:idMembro',
         component:AlteraCadastroMembroComponent
       }
     ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
