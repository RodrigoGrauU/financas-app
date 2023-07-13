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

  buscaCarteira(idCarteira:number) {
    let urlFinal =  this.urlBase + "/carteiras/" + idCarteira;
    return this.http.get<Carteira>(urlFinal);
  }

  buscaInformacoesCarteiras(): Observable<Carteira[]> {
    //TODO - realizar busca a partir do usuário logado
    let urlFinal =  this.urlBase + "/carteiras";
    console.log('consultar servico externo via API REST: ' + urlFinal);
    return this.http.get<Carteira[]>(urlFinal);
  }

  atualizaTransacao(transacao:Transacao): Observable<Transacao> {
    let urlAtualizacao = this.urlBase + "/transacoes/" + transacao.id;
    console.log('fazer chamada ao serviço externo via API REST para atualizar registro: ' + urlAtualizacao);
    return this.http.put<Transacao>(urlAtualizacao, transacao);
  }

  removeTransacao(idTransacao?: number): Observable<Transacao> {
    console.log('fazer chamada ao serviço externo via API REST para remover registro. Id transação: ' + idTransacao);
    return this.http.delete<Transacao>(this.urlBase + "/transacoes/" + idTransacao);
  }
}
