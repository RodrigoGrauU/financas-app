import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Carteira } from 'src/app/model/carteira';
import { CategoriaTransacao } from 'src/app/model/categoriaTransacao';
import { TipoTransacao } from 'src/app/model/tipoTransacao';
import { Transacao } from 'src/app/model/transacao';
import { ToastInfoService } from 'src/app/services/styles/toast-info.service';
import { TransacaoService } from 'src/app/services/transacao/transacao.service';

@Component({

  selector: 'app-lista-importa-extrato',
  templateUrl: './lista-importa-extrato.component.html',
  styleUrl: './lista-importa-extrato.component.css'
})

export class ListaImportaExtratoComponent {
  @ViewChild("fileUpload") fileUpload!:ElementRef;
  @ViewChild("btnSubmit") btnSubmit!: ElementRef;
  bankStatement:File|null = null;
  listaTransacoes:Array<Transacao>|null = null;
  listaCategoriaTransacoes: Array<CategoriaTransacao> = [];
  carteirasDisponiveis: any;

  //modal
  closeResult = '';
  modelDateParaAtualizar:NgbDateStruct = {year: 2010, month: 1, day: 1};
  modalAtualizacao?:NgbModalRef;
  configuracaoPadrao: ModalConfiguracaoImport = {};


  constructor(private toastService:ToastInfoService, private transacaoService:TransacaoService, private modalService:NgbModal) {
    this.modalService = modalService;
  }

  removerTransacao(transacao: Transacao, indexPosition:number) {
    if(this.listaTransacoes != null) {
      transacao = this.listaTransacoes[indexPosition];
    this.listaTransacoes = this.listaTransacoes?.filter(t => t != transacao);
    }
  }

  compareCategoriaTransacao(categoriaTransacaoA:any, categoriaTransacaoB:any):boolean {
    return categoriaTransacaoA && categoriaTransacaoB && categoriaTransacaoA.id == categoriaTransacaoB.id;
  }

  buscaCategoriasDisponiveis() {
    this.transacaoService.buscaCategoriasTransacoes().subscribe(
      (categoriasTransacoes) => {
        this.listaCategoriaTransacoes = categoriasTransacoes;
      }
    )
  }

  buscaCarteirasDisponiveis() {
    this.transacaoService.buscaInformacoesCarteiras().subscribe(
      (carteiras) => {
        this.carteirasDisponiveis = carteiras;
      }
    )
  }

  btnEnable() {
    this.btnSubmit.nativeElement.disabled = false;
  }

  importarExtrato() {
    this.bankStatement = this.fileUpload.nativeElement.files[0];
    const formData = new FormData();
    if(this.bankStatement != null) {
      formData.append("bankStatement", this.bankStatement);
      this.transacaoService.importarTransacoesArquivo(formData).subscribe({
        next: (resultado) => {
            this.buscaCategoriasDisponiveis();
            this.buscaCarteirasDisponiveis();
            this.toastService.showSuccess("Arquivo Importado", "arquivo importado com sucesso!");
            this.listaTransacoes =  resultado;
            this.listaTransacoes.forEach(transacao => {
              if(transacao.carteira == null) {
                transacao.carteira = this.configuracaoPadrao.carteiraPadrao ? this.configuracaoPadrao.carteiraPadrao : undefined;
              }
              if(transacao.categoriaTransacao == null) {
                transacao.categoriaTransacao = this.configuracaoPadrao.categoriaPadrao ? this.configuracaoPadrao.categoriaPadrao : undefined;
              }
            })            
        },
        error: (e) => {
          this.toastService.showDanger("Ocorreu um erro", "Erro ao tentar importar arquivo");
        } 
      });
    }
  }

  salvarTransacoes() { 
    if(this.listaTransacoes?.find(transacao => transacao.carteira == null || transacao.carteira === undefined) != undefined) {
      this.toastService.showDanger("Valores inválidos", "O campo carteira deverá conter um valor válido");
      return;
    }

    if(this.listaTransacoes?.find(transacao => transacao.categoriaTransacao == null || transacao.categoriaTransacao === undefined) != undefined) {
      this.toastService.showDanger("Valores inválidos", "O campo categoria deverá conter um valor válido");
      return;
    }

    if(this.listaTransacoes) {
      this.transacaoService.salvarTransacoes(this.listaTransacoes).subscribe({
        next: (v) => {
          this.toastService.showSuccess("Salvo com Sucesso", "As transações foram salvas com sucesso");
          this.listaTransacoes = null;
          this.fileUpload.nativeElement.value = null;
          this.btnSubmit.nativeElement.disabled = true;
        },
        error: (e) => {
          this.toastService.showDanger("Ocorreu um erro", "Houve um erro ao salvar as informações");
        }
      });
    }
  }

  compareTipoTransacao(tipoTransacaoA:any, tipoTransacaoB:any):boolean {
    return tipoTransacaoA && tipoTransacaoB && tipoTransacaoA == tipoTransacaoB;
  }

  isDebito(tipoTransacao:TipoTransacao):boolean {
    return tipoTransacao == TipoTransacao.DEBITO;
  }

  listaTiposTransacoes():  Array<TipoTransacao> {
    let lista = new Array();
    lista.push(TipoTransacao[TipoTransacao.CREDITO]);
    lista.push(TipoTransacao[TipoTransacao.DEBITO]);
    return lista;
  
  }

  compareCarteira(carteiraA:any, carteiraB:any):boolean {
    return carteiraA && carteiraB && carteiraA.id == carteiraB.id;
  }

  configuraValores(content:any) {
    this.buscaCarteirasDisponiveis();
    this.buscaCategoriasDisponiveis();
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
  
  salvaConfiguracao(form:NgForm) {
    this.configuracaoPadrao.carteiraPadrao = form.controls["carteiraPadrao"].value;
    this.configuracaoPadrao.categoriaPadrao = form.controls["categoriaPadrao"].value;
    this.modalAtualizacao?.close();
  }

}

interface ModalConfiguracaoImport {
  carteiraPadrao?: Carteira
  categoriaPadrao?: CategoriaTransacao
}
