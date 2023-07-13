import { Injectable } from '@angular/core';
import { Transacao } from 'src/app/model/transacao';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Carteira } from 'src/app/model/carteira';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private urlBase = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  // salvarTransacao(transacao: Transacao) {
  //   console.log('fazer chamada ao serviço externo via API REST');
  // }
  salvarTransacao(transacao: Transacao): Observable<Transacao> {
    const urlTransacoes = this.urlBase + "/transacoes";
    console.log('fazer chamada ao serviço externo via API REST');
    return this.http.post<Transacao>(urlTransacoes, transacao);
  }

  buscaTransacoes(idCarteira:number, anoTransacao:number | null, mesTransacao:number | null): Observable<Transacao[]> {
    let urlTransacoes = this.urlBase + "/carteiras/" + idCarteira + "/transacoes?";
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
    let urlFinal =  this.urlBase + "/carteiras/" + idCarteira;
    return this.http.get<Carteira>(urlFinal);
  }

  atualizaTransacao(transacao:Transacao): Observable<Transacao> {
    let urlAtualizacao = this.urlBase + "/transacoes/" + transacao.id;
    console.log('fazer chamada ao serviço externo via API REST para atualizar registro: ' + urlAtualizacao);
    return this.http.put<Transacao>(urlAtualizacao, transacao);
  }
}
