export class Carteira {
  id: number;
  nome: string;
  anosTransacoes: AnosTransacoes[] = [];

  constructor(id: number, nome: string) {
    this.id = id;
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
