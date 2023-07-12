import { AnosTransacoes } from './../../../model/carteira';
import { Component, OnInit } from '@angular/core';
import { Transacao } from 'src/app/model/transacao';
import { TransacaoService } from 'src/app/services/transacao/transacao.service';

@Component({
  selector: 'app-lista-transacao',
  templateUrl: './lista-transacao.component.html',
  styleUrls: ['./lista-transacao.component.css']
})
export class ListaTransacaoComponent implements OnInit {
  mesTransacaoSelecionado:number;
  anoTransacaoSelecionado: number;
  pessoas:any = [];
  mesesDisponiveis: number[] = [];
  anosDisponiveis: number[] = [];
  anosTransacoes: AnosTransacoes[] = [];

  transacoes:Array<Transacao> = [];


  constructor(private transacaoService:TransacaoService) {
    this.mesTransacaoSelecionado = 0;
    this.anoTransacaoSelecionado = 0;

    let transacaoA:Transacao = {
      id: 1,
      valor: 254.76,
      descricao: 'Gastos com animais',
      dataTransacao: new Date(),
      carteira: 2
    }

    let transacaoB = {
      id: 2,
      carteira: 2,
      valor: 54.90,
      descricao: 'Gastos com Saúde',
      dataTransacao: new Date(2023, 5, 1)
    }

    this.transacoes.push(transacaoA, transacaoB);
  }

  ngOnInit(): void {
    this.consultaInformacoesGeraisCarteira(2);
  }
  consultaInformacoesGeraisCarteira(idCarteira: number) {
    console.log('buscando informações da carteira com id: ' + idCarteira);

    this.transacaoService.buscaInformacoesCarteira(idCarteira).subscribe(
      (carteira) => {
        this.anosTransacoes = carteira.anosTransacoes;
        console.log(this.anosTransacoes);
     }
    )
  }

  buscaAnosDisponiveis(): void {
    // TODO - a consultar anos disponiveis para o cliente
    this.anosDisponiveis.push(2023,2022,2021,2020);
  }

  buscaMesesDisponiveis(ano:number): void {
    this.anosTransacoes.forEach(anoTransacao => {
      if(anoTransacao.ano == ano) {
        this.mesesDisponiveis = anoTransacao.mesesTransacoes;
      }
    })
  }

  alteraAnoTransacao() {
    console.info('Consultar novas transações com o ano base: ' + this.anoTransacaoSelecionado);
    console.info('Mês selecionado: ' + this.mesTransacaoSelecionado);
    this.buscaMesesDisponiveis(this.anoTransacaoSelecionado);
  }

  atualizaListaTransacao() {
    console.info('consultando dados via API');
    this.transacaoService.buscaTransacoes(1, this.anoTransacaoSelecionado, this.mesTransacaoSelecionado).subscribe(
      (transacoes) => {
        this.transacoes = transacoes;
      }
    )
    console.info('Retorno API: ' + this.transacoes);
  }
}
