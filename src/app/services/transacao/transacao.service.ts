import { Injectable } from '@angular/core';
import { Transacao } from 'src/app/model/transacao';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Carteira } from 'src/app/model/carteira';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private urlBase = 'http://localhost:3000/carteiras';
  constructor(private http: HttpClient) { }

  // salvarTransacao(transacao: Transacao) {
  //   console.log('fazer chamada ao serviço externo via API REST');
  // }
  salvarTransacao(transacao: Transacao): Observable<Transacao> {
    console.log('fazer chamada ao serviço externo via API REST');
    console.log(transacao);
    return this.http.post<Transacao>(this.urlBase, transacao);
  }

  buscaTransacoes(idCarteira:number, anoTransacao:number | null, mesTransacao:number | null): Observable<Transacao[]> {
    let urlTransacoes = this.urlBase + "/" + idCarteira + "/transacoes?";
    if(anoTransacao != null) {
      urlTransacoes += "anoTransacao=" + anoTransacao;
    }

    if(mesTransacao != null) {
      urlTransacoes += "&mesTransacao=" + mesTransacao;
    }

    console.log("Busca transacões: " + urlTransacoes);
    return this.http.get<Transacao[]>(urlTransacoes);
  }

  buscaInformacoesCarteira(idCarteira:number) {
    let urlFinal =  this.urlBase + "/" + idCarteira;
    return this.http.get<Carteira>(urlFinal);
  }
}
