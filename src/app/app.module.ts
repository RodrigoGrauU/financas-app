import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateParserFormatter, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component';
import { CreateTransacaoComponent } from './components/transacao/create-transacao/create-transacao.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListaTransacaoComponent } from './components/transacao/lista-transacao/lista-transacao.component';
import ptBR from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PrincipalComponent } from './views/principal/principal.component';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { DateInputFormatterBoostrap } from './utils/DateInputFormatterBootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';



registerLocaleData(ptBR);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    CreateTransacaoComponent,
    ListaTransacaoComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule,
    CurrencyMaskModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: NgbDateParserFormatter,
      useClass: DateInputFormatterBoostrap
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
