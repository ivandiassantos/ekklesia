import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { LayoutLoginModule } from './layout/layout-login/layout-login.module';
import { LayoutFuncionalidadeModule } from './layout/layout-funcionalidade/layout-funcionalidade.module';
import { MembroModule } from './membro/membro.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    LayoutLoginModule,
    LayoutFuncionalidadeModule,
    MembroModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
