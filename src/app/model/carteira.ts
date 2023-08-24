export class Carteira {
  id?: number;
  nome: string;
  descricao?:string;
  listaAnosTransacoes: AnosTransacoes[] = [];

  constructor(nome: string) {
    this.nome = nome;
  }

}

export class AnosTransacoes {
  ano: number;
  meses: number[];
  constructor(ano: number, meses: number[]) {
    this.ano = ano;
    this.meses = meses;
  }
}
