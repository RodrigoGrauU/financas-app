import { Token } from '@angular/compiler';
import { Usuario } from './../../model/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase = environment.apiUrl;

  constructor(private httpClient:HttpClient, private router:Router) { }

  logar(usuario:Usuario): Observable<any> {
      let urlLogin = this.urlBase + "/login";
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
       return this.httpClient.post<any>(urlLogin, JSON.stringify({
          username: usuario.codigo,
          password: usuario.senha
       }), {headers: headers}
       );
  }

  deslogar() {
    localStorage.clear();
    // this.router.navigate(['login']);
  }

  inserirNovoUsuario(novoUsuario:Usuario):Observable<any> {
    let UrlLogon = this.urlBase + "/logon";
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<any>(UrlLogon, JSON.stringify({
      username: novoUsuario.codigo,
      password: novoUsuario.senha,
      email: novoUsuario.email
    }), {headers: headers}); 
  }

  get obterUsuarioLogado(): Usuario {
    return localStorage.getItem('usuario')
      ? JSON.parse(atob(localStorage.getItem('usuario') || ''))
      : null;
  }

  get logado(): boolean {
    return localStorage.getItem('usuario') ? true : false;
  }

  get obterTokenUsuario(): string | null {
    let usuario = this.obterUsuarioLogado;
    return btoa(usuario.codigo + ":"+usuario.senha);
  }

  get obterTokenJwt():string {
      let localStorageJwtToken = localStorage.getItem('tokenJWT');
      if(localStorageJwtToken == null) {
        throw new Error('Token não definido!');
      }
      return atob(localStorageJwtToken);
  }
}
