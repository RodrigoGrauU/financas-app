import { Injectable } from '@angular/core';
import { Transacao } from 'src/app/model/transacao';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Carteira } from 'src/app/model/carteira';
import { TipoTransacao } from '../../model/tipoTransacao';
import { CategoriaTransacao } from 'src/app/model/categoriaTransacao';
import { ResumoMes } from 'src/app/model/dto/resumoMes';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private urlBase = environment.apiUrl;
  constructor(private http: HttpClient) { }

  salvarTransacao(transacao: Transacao): Observable<Transacao> {
    const urlTransacoes = this.urlBase + "/carteiras/" + transacao.carteira?.id + "/transacoes";
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

  atualizaTransacao(carteiraId:number, transacao:Transacao): Observable<Transacao> {
    let urlAtualizacao = this.urlBase + "/carteiras/" + carteiraId + "/transacoes/" + transacao.id;
    console.log('fazer chamada ao serviço externo via API REST para atualizar registro: ' + urlAtualizacao);
    return this.http.put<Transacao>(urlAtualizacao, transacao);
  }

  removeTransacao(carteiraId:number, idTransacao?: number): Observable<Transacao> {
    console.log('fazer chamada ao serviço externo via API REST para remover registro. Id transação: ' + idTransacao);
    return this.http.delete<Transacao>(this.urlBase + "/carteiras/" + carteiraId + "/transacoes/" + idTransacao);
  }

  buscaTiposTransacoes(): Observable<TipoTransacao[]> {
    console.log('Realizando busca dos tipos de transações. URL: ' + this.urlBase + "/tipos-transacoes");
    return this.http.get<TipoTransacao[]>(this.urlBase + "/tipos-transacoes");
  }

  buscaCategoriasTransacoes(): Observable<CategoriaTransacao[]> {
    console.log('Realizando busca das categorias de transações. URL: ' + this.urlBase + "/categorias-transacoes");
    return	this.http.get<CategoriaTransacao[]>(this.urlBase + "/categorias-transacoes");

  }

  consultarResumoMes(ano: number, mes: number, carteiraId: number):Observable<ResumoMes> {
    console.log('Realizando consulta do resumo do mes. URL: ' + this.urlBase + "/resumos-meses?ano=" + ano + "&mes=" + mes + "&carteiraId=" + carteiraId);
    return this.http.get<ResumoMes>(this.urlBase + "/resumos-meses?ano=" + ano + "&mes=" + mes + "&carteiraId=" + carteiraId);
  }
}
