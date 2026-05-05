import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-estudiante-calendario',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Calendario">
      <p>Mi calendario académico.</p>
    </p-card>
  `
})
export class EstudianteCalendarioComponent {}