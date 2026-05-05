import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Mis Alumnos">
      <p>Listado de alumnos por curso.</p>
    </p-card>
  `
})
export class AlumnosComponent {}