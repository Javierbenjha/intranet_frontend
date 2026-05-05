import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-director-cursos',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Administración de Cursos">
      <p>Gestión de cursos por niveles (Inicial, Primaria, Secundaria).</p>
    </p-card>
  `
})
export class DirectorCursosComponent {}