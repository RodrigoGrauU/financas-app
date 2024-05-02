import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { environment } from 'src/environments/environment';

export const usuarioAutenticadoGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if(!environment.useAuthLogin) {
      return true;
  }

  if(loginService.logado) {
    return true;
  }

  router.navigate(['login']);
  return false;
};
