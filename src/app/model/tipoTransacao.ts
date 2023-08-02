export class TipoTransacao {
  id?:number;
  nome: string;
  descricao?:string;

  constructor(nome:string){
    this.nome = nome;
  }
}
