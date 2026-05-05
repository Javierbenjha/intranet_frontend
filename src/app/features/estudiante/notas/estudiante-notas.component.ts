import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-estudiante-notas',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Mis Notas">
      <p>Ver mis calificaciones.</p>
    </p-card>
  `
})
export class EstudianteNotasComponent {}