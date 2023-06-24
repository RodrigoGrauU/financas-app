import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: Usuario = new Usuario(0, '', ''); 

  constructor(private route:Router) { }
  logar() {
    alert('logar');
    console.log(this.usuario);
    
    this.route.navigate(['/']);
  }
}
