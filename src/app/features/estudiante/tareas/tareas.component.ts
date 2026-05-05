import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-estudiante-tareas',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Mis Tareas">
      <p>Ver y entregar tareas.</p>
    </p-card>
  `
})
export class EstudianteTareasComponent {}