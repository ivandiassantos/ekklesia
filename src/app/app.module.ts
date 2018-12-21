import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { LayoutLoginModule } from './layout/layout-login/layout-login.module';
import { LayoutFuncionalidadeModule } from './layout/layout-funcionalidade/layout-funcionalidade.module';
import { MembroModule } from './membro/membro.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { RequestInterceptor } from './autenticacao/interceptor/request.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material';

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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
