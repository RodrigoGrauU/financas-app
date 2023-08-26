import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaTransacao } from 'src/app/model/categoriaTransacao';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  urlBase: string = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  salvarCategoria(categoria: CategoriaTransacao): Observable<CategoriaTransacao> {
    return this.httpClient.post<CategoriaTransacao>(this.urlBase + "/categorias-transacoes", categoria);
  }

  obtemCategorias(): Observable<CategoriaTransacao[]> {
    return this.httpClient.get<CategoriaTransacao[]>(this.urlBase + "/categorias-transacoes");
  }

  atualizarCategoria(categoria: CategoriaTransacao): Observable<CategoriaTransacao> {
    return this.httpClient.put<CategoriaTransacao>(this.urlBase + "/categorias-transacoes/" + categoria.id, categoria);
  }

  removerCategoria(categoria: CategoriaTransacao): Observable<CategoriaTransacao> {
    return this.httpClient.delete<CategoriaTransacao>(this.urlBase + "/categorias-transacoes/" + categoria.id);
  }
}

