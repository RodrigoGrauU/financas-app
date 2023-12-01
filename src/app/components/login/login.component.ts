import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: Usuario = new Usuario(0, '', '');
  @ViewChild("divLogin") divLogin!:ElementRef;
  @ViewChild("divLogon") divLogon!: ElementRef;
  @ViewChild("btnRegister") btnRegister!: ElementRef;
  @ViewChild("btnLogin") btnLogin!: ElementRef;
  @ViewChild("passwordConfirm") inputSenhaConfirm!: ElementRef;

  usuarioRegistro:Usuario = new Usuario(0, '', '');

  constructor(private route:Router, private loginService: LoginService,
    private elementRef:ElementRef) { }
  logar() {
    this.loginService.logar(this.usuario);  
  }

  formRegistrar() {
    this.divLogin.nativeElement.className = "tab-pane fade";
    this.divLogon.nativeElement.className = "tab-pane show active";
    this.btnLogin.nativeElement.className = "nav-link";
    this.btnRegister.nativeElement.className = "nav-link active";
  }

  formLogin() {
    this.divLogin.nativeElement.className = "tab-pane show active";
    this.divLogon.nativeElement.className = "tab-pane fade";
    this.btnLogin.nativeElement.className = "nav-link active";
    this.btnRegister.nativeElement.className = "nav-link";
  }

  registrar() {
    let passwordConfirm = this.inputSenhaConfirm.nativeElement.value;
    if(this.usuarioRegistro.senha === passwordConfirm) {
      this.loginService.inserirNovoUsuario(this.usuarioRegistro).subscribe({
        next: (v) => {
          alert("Usuário criado com sucesso");
          this.formLogin();
          this.usuarioRegistro = new Usuario(0, '', '');
        },
        error: (e) => {
          alert("Não foi possível criar o usuário. Tente novamente mais tarde");
        }
      });
      return;
    }
    alert('por favor, ajuste os campos da senha');
  }
}
