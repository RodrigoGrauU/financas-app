import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login/login.service';
import { ToastInfoService } from 'src/app/services/styles/toast-info.service';

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
  @ViewChild("btnLoginForm") btnLoginForm!: ElementRef;
  @ViewChild("btnLogonForm") btnLogonForm!: ElementRef;
  @ViewChild("spinnerLogin") spinnerLogin!: ElementRef;
  @ViewChild("spinnerLogon") spinnerLogon!: ElementRef;

  public passwordConfirmInput:string = "";

  usuarioRegistro:Usuario = new Usuario(0, '', '');

  constructor(private route:Router, private loginService: LoginService,
    private toastService: ToastInfoService) { }
  logar() {
    this.btnLoginForm.nativeElement.disabled = true;
    this.spinnerLogin.nativeElement.hidden = false;
    this.loginService.logar(this.usuario).subscribe({
      next: (v) => {
        localStorage.setItem('usuario', btoa(JSON.stringify(this.usuario)));
        this.route.navigate(['']);
      },
      error: (v) => {
        this.toastService.showInfo("Problema com login", "Não foi possível efetuar o login");
        this.btnLoginForm.nativeElement.disabled = false;
        this.spinnerLogin.nativeElement.hidden = true;
      }
    }
    )
    // .subscribe((resposta) => {
    //   localStorage.setItem('usuario', btoa(JSON.stringify(this.usuario)));
    //   this.route.navigate(['']);
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
    this.btnLogonForm.nativeElement.disabled = true;
    this.spinnerLogon.nativeElement.hidden = false;
    if(this.usuarioRegistro.senha === passwordConfirm) {
      this.loginService.inserirNovoUsuario(this.usuarioRegistro).subscribe({
        next: (v) => {
          this.toastService.showSuccess("Usuário criado", "Usuário criado com sucesso. Faça login para entrar");
          this.formLogin();
          this.usuarioRegistro = new Usuario(0, '', '');
          this.buttonActiveAgain();
        },
        error: (e) => {
          this.toastService.showInfo("Criação do usuário", "Não foi possível criar o usuário. Tente novamente mais tarde");
          this.buttonActiveAgain();
        }
      });
      return;
    }
    this.buttonActiveAgain();
    this.toastService.showDanger("Criação de usuário","por favor, ajuste os campos da senha");
  }

  isValidForClass(modelo:NgModel):string {
    if(modelo.valid && (modelo.dirty || modelo.touched)) {
      return 'is-valid';
    } else if(modelo.invalid && (modelo.dirty || modelo.touched)) {
      return 'is-invalid';
    }
    return ''
  }

  buttonActiveAgain() {
    this.spinnerLogon.nativeElement.hidden = true;
    this.btnLogonForm.nativeElement.disabled = false;
  }
}
