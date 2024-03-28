import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { CategoriaTransacao } from 'src/app/model/categoriaTransacao';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ToastInfoService } from 'src/app/services/styles/toast-info.service';

@Component({
  selector: 'app-create-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrls: ['./create-categoria.component.css']
})
export class CreateCategoriaComponent implements OnInit {
  @Input() isExibeTitulo: boolean = true;
  @Input() titulo?:string;
  @Input() categoria: CategoriaTransacao;
  @ContentChild("atualizaCategoria") atualizaCategoria?:TemplateRef<any>;

  constructor(private categoriaService: CategoriaService, private alertService: ToastInfoService) {
    this.categoria = new CategoriaTransacao("");
  }
  ngOnInit(): void {
    this.titulo = this.titulo ? this.titulo : "Adicionar Categoria";
  }

  salvarCategoria(categoria:CategoriaTransacao){
    this.categoriaService.salvarCategoria(categoria).subscribe({
      next: () => {
        this.categoria = new CategoriaTransacao("");
        this.alertService.showSuccess("Categoria salva", "Categoria salva com sucesso!");
      },
      error: (e) => {
        this.alertService.showDanger("Erro ao salvar", "Não foi possível salvar a categoria");
      }
    }
    )
  }
}
