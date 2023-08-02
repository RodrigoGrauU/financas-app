import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Carteira } from 'src/app/model/carteira';
import { CarteiraService } from 'src/app/services/carteira/carteira.service';

@Component({
  selector: 'app-create-carteira',
  templateUrl: './create-carteira.component.html',
  styleUrls: ['./create-carteira.component.css']
})
export class CreateCarteiraComponent {
  @Input() carteira: Carteira;
  @ContentChild('atualizaCarteira') atualizaCarteira?:TemplateRef<any>;

  constructor(private carteiraService: CarteiraService) {
    this.carteira = new Carteira("");
  }

  salvarCarteira() {
    this.carteiraService.salvarCarteira(this.carteira).subscribe(() => {
      this.carteira = new Carteira("");
    });
  }
}
