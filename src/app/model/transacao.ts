import { Carteira } from "./carteira";
import { CategoriaTransacao } from "./categoriaTransacao";
import { TipoTransacao } from "./tipoTransacao";

export class Transacao {
    id?:number;
    carteira?:Carteira;
    valor:number =  0;
    descricao:string;
    dataTransacao:Date;
    tipoTransacao?: TipoTransacao;
    categoriaTransacao?: CategoriaTransacao;

    constructor(valor:number, descricao:string, dataTransacao:Date){
      this.valor = valor;
      this.descricao = descricao;
      this.dataTransacao = dataTransacao;
    }
  }
