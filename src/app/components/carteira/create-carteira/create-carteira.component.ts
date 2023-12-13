import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Carteira } from 'src/app/model/carteira';
import { Problem } from 'src/app/model/problem';
import { CarteiraService } from 'src/app/services/carteira/carteira.service';
import { ToastInfoService } from '../../../services/styles/toast-info.service';

@Component({
  selector: 'app-create-carteira',
  templateUrl: './create-carteira.component.html',
  styleUrls: ['./create-carteira.component.css']
})
export class CreateCarteiraComponent {
  @Input() carteira: Carteira;
  @ContentChild('atualizaCarteira') atualizaCarteira?:TemplateRef<any>;

  constructor(private carteiraService: CarteiraService, private alertService:ToastInfoService) {
    this.carteira = new Carteira("");
  }

  salvarCarteira() {
    this.carteiraService.salvarCarteira(this.carteira).subscribe({
      next: () => {
        this.alertService.showSuccess("Carteira Adicionada", "Sua carteira foi criada com sucesso");
        this.carteira = new Carteira("");
      },
      error: (e) => {
        let problem: Problem = e.error;
        let msg = problem.userMessage? problem.userMessage : 'não foi possível criar a carteira';
        this.alertService.showDanger("Erro ao criar carteira", msg);
      }
    });
  }
}
