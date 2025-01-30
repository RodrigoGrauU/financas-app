import { FormatDatainputService } from './../../../services/utils/format.datainput.service';
import { ModalDismissReasons, NgbCalendar, NgbDate, NgbDateStruct, NgbDatepicker, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DayTemplateContext } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context';
import { TransacaoService } from 'src/app/services/transacao/transacao.service';
import { Transacao } from '../../../model/transacao';
import { TipoTransacao } from 'src/app/model/tipoTransacao';
import { CategoriaTransacao } from 'src/app/model/categoriaTransacao';
import { Carteira } from 'src/app/model/carteira';
import { ToastInfoService } from 'src/app/services/styles/toast-info.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-create-transacao',
  templateUrl: './create-transacao.component.html',
  styleUrls: ['./create-transacao.component.css']
})
export class CreateTransacaoComponent implements OnInit {


  @Output() dataAtualizadaOutput = new EventEmitter();
  transacao:Transacao = new Transacao(0.00, '', new Date());
  modelDate: NgbDateStruct = this.calendar.getToday();

  @Input() transacaoASerAtualizada?: Transacao;
  @Input() modelDateAtualizacao?: NgbDateStruct;
  @Input() titulo: string = "Adicionar Transação";
  @ContentChild('atualizaTransacao') atualizaTransacaoCustomizado?: TemplateRef<any>;

  listaTiposTransacoes: Array<TipoTransacao> = [];
  listaCategoriaTransacoes: Array<CategoriaTransacao> = [];
  carteirasDisponiveis: Carteira[] = [];

  //modal
  closeResult = '';
  modalNovaCategoria?:NgbModalRef;

  novaCategoriaModel:CategoriaTransacao = new CategoriaTransacao('');

  constructor(private transacaoService: TransacaoService, private calendar: NgbCalendar,
    private formatDatainputService: FormatDatainputService, private infoService: ToastInfoService,
    private modalService: NgbModal, private categoriaService:CategoriaService, private alertService:ToastInfoService) {}
  ngOnInit(): void {
    this.transacao = this.transacaoASerAtualizada ? this.transacaoASerAtualizada : this.transacao;
    this.modelDate = this.modelDateAtualizacao ? this.modelDateAtualizacao : this.modelDate;
    this.buscaInformacoesGeraisCarteira();
  }

  atualizaData(dataAtualizada: NgbDateStruct|undefined) {
    this.dataAtualizadaOutput.emit(dataAtualizada);
  }

  isDisabled = (date: NgbDate, current: { month: number; year: number }) => date.month !== current.month;
	isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;

  formatarNumeroDinheiro(valor:number):string {
    return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  }

  salvarTransacao() {
    if(this.modelDateAtualizacao) {
      this.transacao.dataTransacao = this.formatDatainputService.formatInputDateToOutput(this.modelDateAtualizacao);
    }
    this.transacaoService.salvarTransacao(this.transacao).subscribe({
      next: (transacaoSalva) => {
        this.infoService.showSuccess("Transação salva", "Transação salva com sucesso!");
        this.transacao = new Transacao(0, '', new Date());
      }, 
      error: (e) => {
        this.infoService.showDanger("Erro ao salvar", "Não foi possível salvar a transação");
        console.log(e);
      }
    })
  }

  buscaInformacoesGeraisCarteira() {
      this.transacaoService.buscaTiposTransacoes().subscribe(
        (tiposTransacoes) => {
          this.listaTiposTransacoes = tiposTransacoes;
        }
      );

      this.buscaCategoriasParaListar();

      this.transacaoService.buscaInformacoesCarteiras().subscribe(
        (carteiras) => {
          this.carteirasDisponiveis = carteiras;
        }
      )
  }

  compareCarteira(carteiraA:any, carteiraB:any):boolean {
    return carteiraA && carteiraB && carteiraA.id == carteiraB.id;
  }

  compareTipoTransacao(tipoTransacaoA:any, tipoTransacaoB:any):boolean {
    return tipoTransacaoA && tipoTransacaoB && tipoTransacaoA == tipoTransacaoB;
  }

  compareCategoriaTransacao(categoriaTransacaoA:any, categoriaTransacaoB:any):boolean {
    return categoriaTransacaoA && categoriaTransacaoB && categoriaTransacaoA.id == categoriaTransacaoB.id;
  }

  novaCategoria(adicaoCategoriaNgTemplate:TemplateRef<any>) {
    this.modalNovaCategoria = this.modalService.open(adicaoCategoriaNgTemplate, {ariaLabelledBy: 'modal-basic-title'})
    this.modalNovaCategoria.result.then(
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

  public salvarNovaCategoria(novaCategoria:CategoriaTransacao) {
    this.categoriaService.salvarCategoria(novaCategoria)
    .subscribe({
      next: () => {
        this.alertService.showSuccess("Categoria Salva", "Uma nova categoria foi salva com sucesso!");
        this.novaCategoriaModel = new CategoriaTransacao("");
        this.buscaCategoriasParaListar();
        this.modalNovaCategoria?.close();
      },
      error: (e) => {
        this.alertService.showDanger("Erro ao salvar", "Não foi possível adicionar a nova categoria");
      }
    })
  }

  public buscaCategoriasParaListar():void {
    this.transacaoService.buscaCategoriasTransacoes().subscribe(
      (categoriasTransacoes) => {
        this.listaCategoriaTransacoes = categoriasTransacoes;
        this.listaCategoriaTransacoes.sort((a, b) => {
          return a.nome > b.nome ? 1 : -1;
        })
      }
    )
  }
}
