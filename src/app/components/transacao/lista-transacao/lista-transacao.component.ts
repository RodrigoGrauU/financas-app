import { ResumoMes } from './../../../model/dto/resumoMes';
import { AnosTransacoes, Carteira } from './../../../model/carteira';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Transacao } from 'src/app/model/transacao';
import { TransacaoService } from 'src/app/services/transacao/transacao.service';
import { FormatDatainputService } from 'src/app/services/utils/format.datainput.service';

@Component({
  selector: 'app-lista-transacao',
  templateUrl: './lista-transacao.component.html',
  styleUrls: ['./lista-transacao.component.css']
})
export class ListaTransacaoComponent implements OnInit {
  carteiraSelecionada: number;
  mesTransacaoSelecionado:number;
  anoTransacaoSelecionado: number;
  pessoas:any = [];
  carteirasDisponiveis: Carteira[] = [];
  mesesDisponiveis: number[] = [];
  anosDisponiveis: number[] = [];
  anosTransacoes: AnosTransacoes[] = [];
  transacoes:Array<Transacao> = [];
  resumoMes:ResumoMes = new ResumoMes(0, 0, 0, 0, 0);

  //modal
  closeResult = '';
  trasacaoParaAlteracao:Transacao = new Transacao(0, '', new Date());
  modelDateParaAtualizar:NgbDateStruct = {year: 2010, month: 1, day: 1};
  modalAtualizacao?:NgbModalRef;

  constructor(private transacaoService:TransacaoService, private modalService: NgbModal,
    private formatDatainputService: FormatDatainputService) {
    this.carteiraSelecionada = 0;
    this.mesTransacaoSelecionado = 0;
    this.anoTransacaoSelecionado = 0;

    this.transacoes = [];
  }

  ngOnInit(): void {
    this.consultaCarteirasUsuario();
  }

  //TODO - trabalhar com este método a ter a sessão do usuário logada
  consultaCarteirasUsuario() {
    this.transacaoService.buscaInformacoesCarteiras().subscribe(
      (carteiras) => {
        this.carteirasDisponiveis = carteiras;
      }
    )
  }

  consultarCarteira(idCarteira: number) {
    let carteiraEncontrada = this.carteirasDisponiveis.find(carteira => carteira.id == idCarteira);
    this.anosTransacoes = carteiraEncontrada?.listaAnosTransacoes || [];

    this.anoTransacaoSelecionado = 0;
    this.mesTransacaoSelecionado = 0;
  }

  alteraAnoTransacao() {
    let carteiraEncontrada = this.carteirasDisponiveis.find(carteira => carteira.id == this.carteiraSelecionada);
    this.mesesDisponiveis = carteiraEncontrada?.listaAnosTransacoes.find(anoLista => anoLista.ano == this.anoTransacaoSelecionado)?.meses || [];
    this.mesTransacaoSelecionado = 0;
  }

  atualizaListaTransacao() {
    console.info('consultando dados via API');
    this.transacaoService.buscaTransacoes(this.carteiraSelecionada, this.anoTransacaoSelecionado, this.mesTransacaoSelecionado).subscribe(
      (transacoes) => {
        this.transacoes = transacoes;
         this.consultarResumoMes(this.anoTransacaoSelecionado, this.mesTransacaoSelecionado, this.carteiraSelecionada);
         console.log(this.transacoes);
      }
    )
  }

  editarTransacao(content:any, transacaoAtualizacao:Transacao) {
    this.modelDateParaAtualizar = {
      year: parseInt(transacaoAtualizacao.dataTransacao.toString().split('T')[0].split('-')[0]),
      month: parseInt(transacaoAtualizacao.dataTransacao.toString().split('T')[0].split('-')[1]),
      day: parseInt(transacaoAtualizacao.dataTransacao.toString().split('T')[0].split('-')[2])
    };

    this.trasacaoParaAlteracao = transacaoAtualizacao;

    this.modalAtualizacao = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    this.modalAtualizacao.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    )
  }

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  atualizarTransacao(carteiraId:number | undefined, transacao: Transacao) {
    if(carteiraId === undefined) {
      carteiraId = 0;
    }
    transacao.dataTransacao = this.formatDatainputService.formatInputDateToOutput(this.modelDateParaAtualizar);
    this.transacaoService.atualizaTransacao(carteiraId, transacao).subscribe(
      (transacaoAtualizada) => {
        alert('Transação atualizada com sucesso!');
        this.modalAtualizacao?.close();
        this.atualizaListaTransacao();
      }
    )
  }

  removerTransacao(carteiraId:number, transacao: Transacao) {
    let confirmaRemocao = window.confirm('Tem certeza que deseja remover essa transação?');

    if(confirmaRemocao) {
      this.transacaoService.removeTransacao(carteiraId, transacao.id).subscribe(transacaoRemovida => {
          this.transacoes = this.transacoes.filter(transacaoFiltrada => transacaoFiltrada.id != transacao.id);
        }
      )
      alert('Transação removida com sucesso!');
    }
  }

  alteraCarteiraSelecionada() {
    console.info('Alterada carteira selecionada: ' + this.carteiraSelecionada + ' - a buscar informações dos meses disponíveis...');
    this.consultarCarteira(this.carteiraSelecionada);
  }

  atualizaDataTransacao(data: NgbDateStruct) {
    this.modelDateParaAtualizar = data;
  }

  isDebitoNaCarteira(transacao:Transacao) {
    return transacao.tipoTransacao?.toString() === "DEBITO";
  }

  consultarResumoMes(ano:number, mes:number, carteiraId:number){
    this.transacaoService.consultarResumoMes(ano, mes, carteiraId).subscribe(resposta => {
      this.resumoMes = resposta;
    })
  }

  obtemListaMesesDisponiveis(): Array<Mes> {
    let meses: Array<Mes> = new Array();
    this.mesesDisponiveis.forEach(mes => {
      switch(mes) {
        case 1:
          meses.push(new Mes('Janeiro', mes));
        break;
        case 2:
        meses.push(new Mes('Fevereiro', mes));
        break;
        case 3:
          meses.push(new Mes('Março', mes));
        break;
        case 4:
          meses.push(new Mes('Abril', mes));
        break;
        case 5:
          meses.push(new Mes('Maio', mes));
        break;
        case 6:
          meses.push(new Mes('Junho', mes));
        break;
        case 7:
          meses.push(new Mes('Julho', mes));
        break;
        case 8:
          meses.push(new Mes('Agosto', mes));
        break;
        case 9:
          meses.push(new Mes('Setembro', mes));
        break;
        case 10:
          meses.push(new Mes('Outubro', mes));
        break;
        case 11:
          meses.push(new Mes('Novembro', mes));
        break;
        case 12:
          meses.push(new Mes('Dezembro', mes));
        break;
      }
    });
    return meses;
  }
}

export class Mes {
  nome: string;
  valor: number;

  constructor(nome:string, valor: number) {
    this.nome = nome;
    this.valor = valor;
  }
}