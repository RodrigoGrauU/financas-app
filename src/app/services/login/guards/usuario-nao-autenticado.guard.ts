import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login.service';

export const usuarioNaoAutenticadoGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if(loginService.logado) {
    router.navigate(['meu-espaco']);
    return false;
  }

  return true;
};
