export class Transacao {
    id?:number;
    carteira:number;
    valor:number =  0;
    descricao:string;
    dataTransacao:Date;
  
    constructor(carteira:number, valor:number, descricao:string, dataTransacao:Date){
      this.carteira = carteira;
      this.valor = valor;
      this.descricao = descricao;
      this.dataTransacao = dataTransacao;
    }
  }
  