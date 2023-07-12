import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { CreateTransacaoComponent } from './components/transacao/create-transacao/create-transacao.component';
import { ListaTransacaoComponent } from './components/transacao/lista-transacao/lista-transacao.component';

const routes: Routes = [
  {path: 'entrar', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: 'adiciona-transacao', component: CreateTransacaoComponent},
  {path: 'transacoes', component: ListaTransacaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
