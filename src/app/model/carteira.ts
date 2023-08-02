export class Carteira {
  id?: number;
  nome: string;
  descricao?:string;
  anosTransacoes: AnosTransacoes[] = [];

  constructor(nome: string) {
    this.nome = nome;
  }

}

export class AnosTransacoes {
  ano: number;
  mesesTransacoes: number[];
  constructor(ano: number, meses: number[]) {
    this.ano = ano;
    this.mesesTransacoes = meses;
  }
}
