import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaTransacao } from 'src/app/model/categoriaTransacao';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ToastInfoService } from 'src/app/services/styles/toast-info.service';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent {

  categorias: Array<CategoriaTransacao> = [];
  categoriaSelecionada:CategoriaTransacao;

  modalAtualizacaoModelo?: NgbModalRef;

  constructor(private modalService: NgbModal, private categoriaService: CategoriaService,
    private alertService: ToastInfoService) {
    this.categoriaSelecionada = new CategoriaTransacao("");
    this.carregaCategorias();
   }

  editarCategoria(content:any, categoria:CategoriaTransacao) {
    this.categoriaSelecionada = categoria;
    this.modalAtualizacaoModelo = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  removerCategoria(categoria:CategoriaTransacao) {
    this.categoriaService.removerCategoria(categoria).subscribe({
      next: () => {
        this.alertService.showSuccess("Categoria removida", "Categoria removida com sucesso!");
        this.carregaCategorias();
      }, 
      error: (e) => {
        this.alertService.showDanger("Erro", "Não foi possível remover a categoria");
        console.log(e);
      }
    })
  }

  atualizarCategoria(categoria:CategoriaTransacao) {
    this.categoriaService.atualizarCategoria(categoria).subscribe({
      next: () => {
        this.alertService.showSuccess("Carteira atualizada", "Carteira atualizada com sucesso");
        this.modalAtualizacaoModelo?.close();
        this.carregaCategorias();
      },
      error: (e) => {
        this.alertService.showDanger("Erro", "Não foi possível atualizar a categoria");
        console.log(e);
      }
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
