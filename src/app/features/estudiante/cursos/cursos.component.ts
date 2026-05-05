import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-estudiante-cursos',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Mis Cursos">
      <p>Ver mis cursos matriculados.</p>
    </p-card>
  `
})
export class EstudianteCursosComponent {}