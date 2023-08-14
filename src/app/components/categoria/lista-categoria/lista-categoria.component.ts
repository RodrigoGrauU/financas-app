import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaTransacao } from 'src/app/model/categoriaTransacao';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent {

  categorias: Array<CategoriaTransacao> = [];
  categoriaSelecionada:CategoriaTransacao;

  modalAtualizacaoModelo?: NgbModalRef;

  constructor(private modalService: NgbModal, private categoriaService: CategoriaService) {
    this.categoriaSelecionada = new CategoriaTransacao("");
    this.carregaCategorias();
   }

  editarCategoria(content:any, categoria:CategoriaTransacao) {
    this.categoriaSelecionada = categoria;
    this.modalAtualizacaoModelo = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  removerCategoria(categoria:CategoriaTransacao) {
    this.categoriaService.removerCategoria(categoria).subscribe(() => {
      alert("Categoria removida com sucesso!");
      this.carregaCategorias();
    })
  }

  atualizarCategoria(categoria:CategoriaTransacao) {
    this.categoriaService.atualizarCategoria(categoria).subscribe(() => {
      alert("Carteira atualizada com sucesso!");
      this.modalAtualizacaoModelo?.close();
      this.carregaCategorias();
    })
  }

  carregaCategorias() {
    this.categoriaService.obtemCategorias().subscribe(
      categorias => {
        this.categorias = categorias;
      }
    );
  }

}
