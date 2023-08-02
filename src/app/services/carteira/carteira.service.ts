import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carteira } from 'src/app/model/carteira';

@Injectable({
  providedIn: 'root'
})
export class CarteiraService {

  private urlBase = 'http://localhost:3000';

  constructor(private HttpClient:HttpClient) { }

  salvarCarteira(carteira:Carteira):Observable<Carteira>{
    const urlCarteiras = this.urlBase + "/carteiras";
    return this.HttpClient.post<Carteira>(urlCarteiras, carteira);
  }

  obtemCarteiras():Observable<Carteira[]>{
    const urlCarteiras = this.urlBase + "/carteiras";
    return this.HttpClient.get<Carteira[]>(urlCarteiras);
  }

  atualizarCarteira(carteira: Carteira): Observable<Carteira> {
    const urlCarteiras = this.urlBase + "/carteiras/" + carteira.id;
    return this.HttpClient.put<Carteira>(urlCarteiras, carteira);
  }

  removerCarteira(carteira: Carteira): Observable<Carteira> {
    const urlCarteiras = this.urlBase + "/carteiras/" + carteira.id;
    return this.HttpClient.delete<Carteira>(urlCarteiras);

  }
}
