import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginService } from '../login/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.loginService.obterTokenUsuario;
    const usuario = this.loginService.obterUsuarioLogado;
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl:Array<any> = "http://localhost:3000/".split("/");

    if(token != null && requestUrl[2] === apiUrl[2]) {
      request = request.clone({
        setHeaders: {
          Authroization: `Bearer ${token}`,
          token: `${token}`,
          usuario: `${usuario.codigo}`,
        }
      });
    }

    return next.handle(request);
  }
}
