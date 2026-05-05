import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Registro de Notas">
      <p>Registro de calificaciones de alumnos.</p>
    </p-card>
  `
})
export class NotasComponent {}