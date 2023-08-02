import { CategoriaTransacao } from "./categoriaTransacao";
import { TipoTransacao } from "./tipoTransacao";

export class Transacao {
    id?:number;
    carteira:number;
    valor:number =  0;
    descricao:string;
    dataTransacao:Date;
    tipoTransacao?: TipoTransacao;
    categoriaTransacao?: CategoriaTransacao;

    constructor(carteira:number, valor:number, descricao:string, dataTransacao:Date){
      this.carteira = carteira;
      this.valor = valor;
      this.descricao = descricao;
      this.dataTransacao = dataTransacao;
    }
  }
