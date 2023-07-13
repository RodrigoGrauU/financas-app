import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component';
import { CreateTransacaoComponent } from './components/transacao/create-transacao/create-transacao.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaTransacaoComponent } from './components/transacao/lista-transacao/lista-transacao.component';
import ptBR from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(ptBR);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    CreateTransacaoComponent,
    ListaTransacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
