import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Gestión de Pagos">
      <p>Aquí el director puede gestionar los pagos de los estudiantes.</p>
    </p-card>
  `
})
export class PagosComponent {}