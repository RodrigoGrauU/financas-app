import { Injectable } from '@angular/core';
import { Transacao } from 'src/app/model/transacao';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private url = 'http://localhost:3000/transacao';
  constructor(private http: HttpClient) { }
  
  // salvarTransacao(transacao: Transacao) {
  //   console.log('fazer chamada ao serviço externo via API REST');
  // }
  salvarTransacao(transacao: Transacao): Observable<Transacao> {
    console.log('fazer chamada ao serviço externo via API REST');
    console.log(transacao);
    return this.http.post<Transacao>(this.url, transacao);
  }
}
