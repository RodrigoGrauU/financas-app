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
import { CreateCategoriaComponent } from './components/categoria/create/create-categoria.component';
import { ListaCategoriaComponent } from './components/categoria/lista-categoria/lista-categoria.component';
import { ListaImportaExtratoComponent } from './components/transacao/lista-importa-extrato/lista-importa-extrato.component';

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
      {path: 'adiciona-categoria', component: CreateCategoriaComponent},
      {path: 'categorias', component: ListaCategoriaComponent},
      {path: 'importa-extrato', component: ListaImportaExtratoComponent}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
