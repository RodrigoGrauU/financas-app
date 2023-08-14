import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { CategoriaTransacao } from 'src/app/model/categoriaTransacao';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

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

  constructor(private categoriaService: CategoriaService) {
    this.categoria = new CategoriaTransacao("");
  }
  ngOnInit(): void {
    console.log(this.titulo);
    this.titulo = this.titulo ? this.titulo : "Adicionar Categoria";
  }

  salvarCategoria(categoria:CategoriaTransacao){
    this.categoriaService.salvarCategoria(categoria).subscribe(
      () => {
        this.categoria = new CategoriaTransacao("");
        alert("Categoria salva com sucesso!");
      }
    )
  }
}
