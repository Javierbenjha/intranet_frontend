import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { dashboardRedirectGuard } from './core/guards/redirect.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/components/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      // Rutas Director
      {
        path: 'director/dashboard',
        loadComponent: () => import('./features/director/dashboard/director-dashboard.component').then(m => m.DirectorDashboardComponent),
        data: { roles: ['director'] }
      },
      {
        path: 'director/pagos',
        loadComponent: () => import('./features/director/pagos/pagos.component').then(m => m.PagosComponent),
        data: { roles: ['director'] }
      },
      {
        path: 'director/cursos',
        loadComponent: () => import('./features/director/cursos/cursos.component').then(m => m.DirectorCursosComponent),
        data: { roles: ['director'] }
      },
      {
        path: 'director/profesores',
        loadComponent: () => import('./features/director/profesores/profesores.component').then(m => m.ProfesoresComponent),
        data: { roles: ['director'] }
      },
      {
        path: 'director/reportes',
        loadComponent: () => import('./features/director/reportes/reportes.component').then(m => m.ReportesComponent),
        data: { roles: ['director'] }
      },

      // Rutas Profesor
      {
        path: 'profesor/cursos',
        loadComponent: () => import('./features/profesor/cursos/cursos.component').then(m => m.ProfesorCursosComponent),
        data: { roles: ['profesor'] }
      },
      {
        path: 'profesor/tareas',
        loadComponent: () => import('./features/profesor/tareas/tareas.component').then(m => m.TareasComponent),
        data: { roles: ['profesor'] }
      },
      {
        path: 'profesor/alumnos',
        loadComponent: () => import('./features/profesor/alumnos/alumnos.component').then(m => m.AlumnosComponent),
        data: { roles: ['profesor'] }
      },
      {
        path: 'profesor/calendario',
        loadComponent: () => import('./features/profesor/calendario/calendario.component').then(m => m.CalendarioComponent),
        data: { roles: ['profesor'] }
      },
      {
        path: 'profesor/notas',
        loadComponent: () => import('./features/profesor/notas/notas.component').then(m => m.NotasComponent),
        data: { roles: ['profesor'] }
      },

      // Rutas Estudiante
      {
        path: 'estudiante/cursos',
        loadComponent: () => import('./features/estudiante/cursos/cursos.component').then(m => m.EstudianteCursosComponent),
        data: { roles: ['estudiante'] }
      },
      {
        path: 'estudiante/tareas',
        loadComponent: () => import('./features/estudiante/tareas/tareas.component').then(m => m.EstudianteTareasComponent),
        data: { roles: ['estudiante'] }
      },
      {
        path: 'estudiante/calendario',
        loadComponent: () => import('./features/estudiante/calendario/estudiante-calendario.component').then(m => m.EstudianteCalendarioComponent),
        data: { roles: ['estudiante'] }
      },
      {
        path: 'estudiante/notas',
        loadComponent: () => import('./features/estudiante/notas/estudiante-notas.component').then(m => m.EstudianteNotasComponent),
        data: { roles: ['estudiante'] }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];