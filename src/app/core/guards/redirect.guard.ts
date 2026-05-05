import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const dashboardRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.user();

  if (user?.rol === 'director') {
    router.navigate(['/director/dashboard']);
  } else if (user?.rol === 'profesor') {
    router.navigate(['/profesor/cursos']);
  } else if (user?.rol === 'estudiante') {
    router.navigate(['/estudiante/cursos']);
  } else {
    router.navigate(['/auth/login']);
  }
  return false;
};