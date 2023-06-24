export class Usuario {
    id: number;
    codigo: string;
    senha: string;

    constructor(id: number, codigo: string, senha:string) {
        this.id = id;
        this.codigo = codigo;
        this.senha = senha;
    }
}