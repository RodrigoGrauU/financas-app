import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Carteira } from 'src/app/model/carteira';
import { Problem } from 'src/app/model/problem';
import { CarteiraService } from 'src/app/services/carteira/carteira.service';
import { ToastInfoService } from 'src/app/services/styles/toast-info.service';

@Component({
  selector: 'app-lista-carteira',
  templateUrl: './lista-carteira.component.html',
  styleUrls: ['./lista-carteira.component.css']
})
export class ListaCarteiraComponent implements OnInit {
  carteiras: Array<Carteira> = [];
  carteiraSelecionada: Carteira = new Carteira("");

  modalAtualizacaoModelo?: NgbModalRef;
  closeResult = '';

  constructor(private carteiraService: CarteiraService,
    private modalService: NgbModal, private alertService: ToastInfoService) { }

  ngOnInit(): void {
    this.carregaCarteiras();
  }

  carregaCarteiras() {
    this.carteiraService.obtemCarteiras().subscribe(
      carteiras => {
        this.carteiras = carteiras;
      }
    );
  }

  editarCarteira(content:any, carteira:Carteira) {
    this.carteiraSelecionada = carteira;
    this.modalAtualizacaoModelo = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  removerCarteira(carteira:Carteira) {
    this.carteiraService.removerCarteira(carteira).subscribe({
      next: () => {
        this.alertService.showSuccess("Carteira removida", "Carteira removida com sucesso!");
        this.carregaCarteiras();
      },
      error: (e) => {
        this.alertService.showDanger("Erro", "Não foi possível remover a carteira");
        console.log(e);
      }
    });
  }

  atualizarCarteira(carteira:Carteira) {
    this.carteiraService.atualizarCarteira(carteira).subscribe({
      next: () => {
        this.alertService.showSuccess("Carteira Atualizada", "Sua carteira foi atualizada com sucesso");
        this.modalAtualizacaoModelo?.close();
        this.carregaCarteiras();
      },
      error: (e) => {
        let problem: Problem = e.error;
        let msg = problem.userMessage? problem.userMessage : 'não foi possível atualizar a carteira';
        this.alertService.showDanger("Erro ao atualizar carteira", msg);
      }
    });
  }
}
