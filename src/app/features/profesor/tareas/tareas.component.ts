import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Gestión de Tareas">
      <p>Crear y gestionar tareas para los cursos.</p>
    </p-card>
  `
})
export class TareasComponent {}