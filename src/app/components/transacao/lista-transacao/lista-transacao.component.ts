import { ResumoMes } from './../../../model/dto/resumoMes';
import { AnosTransacoes, Carteira } from './../../../model/carteira';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Transacao } from 'src/app/model/transacao';
import { TransacaoService } from 'src/app/services/transacao/transacao.service';
import { FormatDatainputService } from 'src/app/services/utils/format.datainput.service';
import { TipoTransacao } from 'src/app/model/tipoTransacao';
import { ToastInfoService } from 'src/app/services/styles/toast-info.service';

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
  despesasChartValues: Array<any> = [
    {data: []}
  ];
  despesasChartLabels:Array<any> = [];

  receitasChartValues: Array<any> = [
    {data: []}
  ];
  receitasChartLabels:Array<any> = [];
    
  //modal
  closeResult = '';
  trasacaoParaAlteracao:Transacao = new Transacao(0, '', new Date());
  modelDateParaAtualizar:NgbDateStruct = {year: 2010, month: 1, day: 1};
  modalAtualizacao?:NgbModalRef;

  constructor(private transacaoService:TransacaoService, private modalService: NgbModal,
    private formatDatainputService: FormatDatainputService, private infoService: ToastInfoService) {
    this.carteiraSelecionada = 0;
    this.mesTransacaoSelecionado = 0;
    this.anoTransacaoSelecionado = 0;

    this.transacoes = [];
  }

  ngOnInit(): void {
    this.consultaCarteirasUsuario();
  }

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

        //  this.despesasChartLabels = listaFinal.map(cat => cat.nome);
         let listaCatChart = this.geraListaChartPie('DEBITO');
         this.despesasChartValues = [{
          data: listaCatChart.map(c => c.valor)
         }];
         this.despesasChartLabels = listaCatChart.map(c => c.nome);

         let listChartReceitas = this.geraListaChartPie('CREDITO');
         this.receitasChartValues = [{
          data: listChartReceitas.map(c => c.valor)
         }];
         this.receitasChartLabels = listChartReceitas.map(c => c.nome);
      }
    )
  }

  private geraListaChartPie(tipoTransacao: string): Array<CategoriaGrafico> {
    let categoriasUnicas = new Set(this.transacoes
      .filter(transacao => transacao.tipoTransacao != undefined && transacao.tipoTransacao.toString() === tipoTransacao)
      .map(transacao => transacao.categoriaTransacao?.id));

    let listaFinal: Array<CategoriaGrafico> = new Array();     
    categoriasUnicas.forEach(idCategoriaUnica => {
      let categoriaDetalhe = this.transacoes
      .filter(transacao => transacao.categoriaTransacao?.id == idCategoriaUnica
        && transacao.tipoTransacao != undefined && transacao.tipoTransacao.toString() === tipoTransacao)
      .map(transacao => transacao.categoriaTransacao)[0];

      let categoriaParaGrafico: CategoriaGrafico = {
        id: categoriaDetalhe ? categoriaDetalhe.id ? categoriaDetalhe.id : 0 : 0,
        nome: categoriaDetalhe ? categoriaDetalhe.nome : '',
        valor: 0
      }

      listaFinal.push(categoriaParaGrafico);
    })
    
    //cria uma lista das categorias com o valor somado com base nas categorias
    listaFinal.forEach(categoria => {
      let valor = this.transacoes
        .filter(tran => tran.categoriaTransacao?.id === categoria.id
        && tran.tipoTransacao != undefined && tran.tipoTransacao.toString() == tipoTransacao)
        .map(tran => tran.valor)
        .reduce((acumulador:number, valorAtual:number) => acumulador + valorAtual, 0)
        categoria.valor = valor;
    })

    return listaFinal;
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
    this.transacaoService.atualizaTransacao(carteiraId, transacao).subscribe({
      next: (transacaoAtualizada) => {
        this.infoService.showSuccess("Transação atualizada", "Transação atualizada com sucesso!")
        this.modalAtualizacao?.close();
        this.atualizaListaTransacao();
      },
      error: (e) => {
        this.infoService.showDanger("Erro ao atualizar", "Não foi possível atualizar a transação");
        console.log(e);
      }
    })
  }

  removerTransacao(carteiraId:number, transacao: Transacao) {
    let confirmaRemocao = window.confirm('Tem certeza que deseja remover essa transação?');

    if(confirmaRemocao) {
      this.transacaoService.removeTransacao(carteiraId, transacao.id).subscribe(transacaoRemovida => {
          this.transacoes = this.transacoes.filter(transacaoFiltrada => transacaoFiltrada.id != transacao.id);
        }
      )
      this.infoService.showSuccess("Transação removida", "Transação removida com sucesso!");
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

interface CategoriaGrafico {
  id: number
  nome: string
  valor: number
}