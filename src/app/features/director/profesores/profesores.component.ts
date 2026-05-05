import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Gestión de Profesores">
      <p>Administración de profesores y asignación de cursos.</p>
    </p-card>
  `
})
export class ProfesoresComponent {}