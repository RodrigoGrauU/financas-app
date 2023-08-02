import { FormatDatainputService } from './../../../services/utils/format.datainput.service';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DayTemplateContext } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context';
import { TransacaoService } from 'src/app/services/transacao/transacao.service';
import { Transacao } from '../../../model/transacao';

@Component({
  selector: 'app-create-transacao',
  templateUrl: './create-transacao.component.html',
  styleUrls: ['./create-transacao.component.css']
})
export class CreateTransacaoComponent implements OnInit {

@Output() dataAtualizadaOutput = new EventEmitter();
atualizaData(dataAtualizada: NgbDateStruct|undefined) {
  this.dataAtualizadaOutput.emit(dataAtualizada);
}
  transacao:Transacao = new Transacao(0, 0.00, '', new Date());
  modelDate: NgbDateStruct = this.calendar.getToday();

  @Input() transacaoASerAtualizada?: Transacao;
  @Input() modelDateAtualizacao?: NgbDateStruct;
  @Input() titulo: string = "Adicionar Transação";
  @ContentChild('atualizaTransacao') atualizaTransacaoCustomizado?: TemplateRef<any>;

  constructor(private transacaoService: TransacaoService, private calendar: NgbCalendar,
    private formatDatainputService: FormatDatainputService) {}
  ngOnInit(): void {
    this.transacao = this.transacaoASerAtualizada ? this.transacaoASerAtualizada : this.transacao;
    this.modelDate = this.modelDateAtualizacao ? this.modelDateAtualizacao : this.modelDate;
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
    this.transacaoService.salvarTransacao(this.transacao).subscribe(
      (transacaoSalva) => {
        alert('Transação salva com sucesso!');
        this.transacao = new Transacao(0, 0, '', new Date());
      }
    )
  }
}
