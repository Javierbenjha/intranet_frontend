import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-profesor-cursos',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Mis Cursos">
      <p>Gestión de mis cursos asignados.</p>
    </p-card>
  `
})
export class ProfesorCursosComponent {}