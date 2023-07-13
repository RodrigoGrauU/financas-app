import { AnosTransacoes, Carteira } from './../../../model/carteira';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Transacao } from 'src/app/model/transacao';
import { TransacaoService } from 'src/app/services/transacao/transacao.service';

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

  //modal
  closeResult = '';
  trasacaoParaAlteracao:Transacao = new Transacao(0, 0, '', new Date());
  modalAtualizacao?:NgbModalRef;

  constructor(private transacaoService:TransacaoService, private modalService: NgbModal) {
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
    this.anosTransacoes = carteiraEncontrada?.anosTransacoes || [];

    this.anoTransacaoSelecionado = 0;
    this.mesTransacaoSelecionado = 0;
  }

  alteraAnoTransacao() {
    let carteiraEncontrada = this.carteirasDisponiveis.find(carteira => carteira.id == this.carteiraSelecionada);
    this.mesesDisponiveis = carteiraEncontrada?.anosTransacoes.find(anoLista => anoLista.ano == this.anoTransacaoSelecionado)?.mesesTransacoes || [];
    this.mesTransacaoSelecionado = 0;
  }

  atualizaListaTransacao() {
    console.info('consultando dados via API');
    this.transacaoService.buscaTransacoes(this.carteiraSelecionada, this.anoTransacaoSelecionado, this.mesTransacaoSelecionado).subscribe(
      (transacoes) => {
        this.transacoes = transacoes;
      }
    )
    console.info('Retorno API: ' + this.transacoes);
  }

  editarTransacao(content:any, transacaoAtualizacao:Transacao) {
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

  atualizarTransacao(transacao: Transacao) {
    this.transacaoService.atualizaTransacao(transacao).subscribe(
      (transacaoAtualizada) => {
        alert('Transação atualizada com sucesso!');
        console.log(this.modalService);
        this.modalAtualizacao?.close();
      }
    )
  }

  removerTransacao(transacao: Transacao) {
    let confirmaRemocao = window.confirm('Tem certeza que deseja remover essa transação?');

    if(confirmaRemocao) {
      this.transacaoService.removeTransacao(transacao.id).subscribe(transacaoRemovida => {
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
}
