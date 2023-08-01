import { Usuario } from './../../model/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient, private router:Router) { }

  logar(usuario:Usuario) {
    return this.mockUsuarioLogin(usuario).pipe(tap((resposta:any) => {
      if(!resposta.sucesso) return;
      localStorage.setItem('token', btoa(resposta.token));
      localStorage.setItem('usuario', btoa(JSON.stringify(resposta.usuario)));
      this.router.navigate(['']);
    }))

  }

  private mockUsuarioLogin(usuario:Usuario):Observable<Usuario> {
    var retornoMock: any = [];

    if(usuario.codigo=='admin' && usuario.senha=='123') {
      retornoMock.sucesso = true;
      retornoMock.usuario = usuario;
      retornoMock.token = 'tokenGerado123';
      return of(retornoMock);
    }

    retornoMock.sucesso = false;
    retornoMock.usuario = usuario;
    return of(retornoMock);
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): Usuario {
    return localStorage.getItem('usuario')
      ? JSON.parse(atob(localStorage.getItem('usuario') || ''))
      : null;
  }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  get obterTokenUsuario(): string | null {
    return localStorage.getItem('token')
      ? atob(localStorage.getItem('token') || '')
      : null;
  }
}
