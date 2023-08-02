import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { CreateTransacaoComponent } from './components/transacao/create-transacao/create-transacao.component';
import { ListaTransacaoComponent } from './components/transacao/lista-transacao/lista-transacao.component';
import { PrincipalComponent } from './views/principal/principal.component';
import { usuarioAutenticadoGuard } from './services/login/guards/usuario-autenticado.guard';
import { usuarioNaoAutenticadoGuard } from './services/login/guards/usuario-nao-autenticado.guard';
import { CreateCarteiraComponent } from './components/carteira/create-carteira/create-carteira.component';
import { ListaCarteiraComponent } from './components/carteira/lista-carteira/lista-carteira.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent, canActivate: [usuarioNaoAutenticadoGuard]
  },
  {
    path: '', component: PrincipalComponent, canActivate: [usuarioAutenticadoGuard],
    children: [
      {path: 'adiciona-transacao', component: CreateTransacaoComponent},
      {path: 'transacoes', component: ListaTransacaoComponent},
      {path: 'criar-carteira', component: CreateCarteiraComponent},
      {path: 'carteiras', component: ListaCarteiraComponent},
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
