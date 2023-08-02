export class TipoTransacao {
  id?:string;
  nome: string;
  descricao?:string;

  constructor(nome:string){
    this.nome = nome;
  }
}
