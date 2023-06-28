import { NgbCalendar, NgbDate, NgbDateStruct, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DayTemplateContext } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context';
import { TransacaoService } from 'src/app/services/transacao/transacao.service';
import { Transacao } from '../../../model/transacao';

@Component({
  selector: 'app-create-transacao',
  templateUrl: './create-transacao.component.html',
  styleUrls: ['./create-transacao.component.css']
})
export class CreateTransacaoComponent {
  transacao:Transacao = new Transacao(0, 0, '', new Date());
  modelDate: NgbDateStruct = this.calendar.getToday();

  constructor(private transacaoService: TransacaoService, private calendar: NgbCalendar) {}

  isDisabled = (date: NgbDate, current: { month: number; year: number }) => date.month !== current.month;
	isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;

  formatarNumeroDinheiro(valor:number):string {
    return valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  salvarTransacao() {
   let data:string = this.modelDate.year + '-' + this.modelDate.month + '-' + this.modelDate.day;
    let date:Date = new Date(data);
    this.transacao.dataTransacao.setDate(date.getDate());
    this.transacaoService.salvarTransacao(this.transacao).subscribe(
      () => {
        alert('Transação salva com sucesso!')
        this.transacao = new Transacao(0, 0, '', new Date())
      }
    )
    // this.transacaoService.salvarTransacao(this.transacao);
  }
}
