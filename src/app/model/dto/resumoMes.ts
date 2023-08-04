export class ResumoMes {
  ano:number;
  mes:number;
  entrada:number;
  saida:number;
  saldoFinal:number;

  constructor(ano:number, mes:number, entrada:number, saida:number, saldoFinal:number){
    this.ano = ano;
    this.mes = mes;
    this.entrada = entrada;
    this.saida = saida;
    this.saldoFinal = saldoFinal;
  }

}
