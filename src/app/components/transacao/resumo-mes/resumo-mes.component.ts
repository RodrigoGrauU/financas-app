import { ResumoMes } from './../../../model/dto/resumoMes';
import { Component, Input } from '@angular/core';
import { TransacaoService } from 'src/app/services/transacao/transacao.service';

@Component({
  selector: 'app-resumo-mes',
  templateUrl: './resumo-mes.component.html',
  styleUrls: ['./resumo-mes.component.css']
})
export class ResumoMesComponent {

  @Input() resumoMes:ResumoMes = new ResumoMes(0, 0, 0, 0, 0);

  constructor() { }

  checkValueSaldoStyle(valor:number):string {
    if(valor == 0 || valor == null) {
      return '';
    }

    return valor > 0 ?  'entrada-fluxo' : 'saida-fluxo';
  }

  buscaNomeMes(mes:number):string {
    if(mes == 1) {
      return 'Janeiro';
    }
    if(mes == 2) {
      return 'Fevereiro';
    }
    if(mes == 3) {
      return 'Março';
    }
    if(mes == 4) {
      return 'Abril';
    }
    if(mes == 5) {
      return 'Maio';
    }
    if(mes == 6) {
      return 'Junho';
    }
    if(mes == 7) {
      return 'Julho';
    }
    if(mes == 8) {
      return 'Agosto';
    }
    if(mes == 9) {
      return 'Setembro';
    }
    if(mes == 10) {
      return 'Outubro';
    }
    if(mes == 11) {
      return 'Novembro';
    }
    if(mes == 12) {
      return 'Dezembro';
    }
    return 'N/A';
  }
}
