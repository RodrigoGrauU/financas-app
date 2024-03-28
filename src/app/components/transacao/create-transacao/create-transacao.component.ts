import { FormatDatainputService } from './../../../services/utils/format.datainput.service';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DayTemplateContext } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context';
import { TransacaoService } from 'src/app/services/transacao/transacao.service';
import { Transacao } from '../../../model/transacao';
import { TipoTransacao } from 'src/app/model/tipoTransacao';
import { CategoriaTransacao } from 'src/app/model/categoriaTransacao';
import { Carteira } from 'src/app/model/carteira';
import { ToastInfoService } from 'src/app/services/styles/toast-info.service';

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

  constructor(private transacaoService: TransacaoService, private calendar: NgbCalendar,
    private formatDatainputService: FormatDatainputService, private infoService: ToastInfoService) {}
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
    const ID_OUTROS = 99;
      this.transacaoService.buscaTiposTransacoes().subscribe(
        (tiposTransacoes) => {
          this.listaTiposTransacoes = tiposTransacoes;
        }
      );

      this.transacaoService.buscaCategoriasTransacoes().subscribe(
        (categoriasTransacoes) => {
          this.listaCategoriaTransacoes = categoriasTransacoes;
          this.listaCategoriaTransacoes.sort((a, b) => {
            if(a.id == ID_OUTROS)  // id do Outros
              return 1;
            return a.nome > b.nome ? 1 : -1;
          })
        }
      )

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
}
