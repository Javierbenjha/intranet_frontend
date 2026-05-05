import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, TableModule, SelectModule, ButtonModule, DatePickerModule, TagModule],
  template: `
    <div class="reportes-container">
      <div class="header">
        <h1>Reportes y Estadísticas</h1>
        <p>Visualiza y genera reportes del sistema</p>
      </div>
      
      <!-- Filtros -->
      <p-card header="Filtros" styleClass="filtros-card">
        <div class="filtros-grid">
          <div class="filtro-item">
            <label>Período</label>
            <p-select 
              [options]="periodos" 
              [(ngModel)]="periodoSeleccionado" 
              optionLabel="label" 
              optionValue="value"
              placeholder="Seleccionar período"
              styleClass="w-full" />
          </div>
          <div class="filtro-item">
            <label>Fecha inicio</label>
            <p-datepicker [(ngModel)]="fechaInicio" [showIcon]="true" styleClass="w-full" />
          </div>
          <div class="filtro-item">
            <label>Fecha fin</label>
            <p-datepicker [(ngModel)]="fechaFin" [showIcon]="true" styleClass="w-full" />
          </div>
          <div class="filtro-item">
            <p-button label="Generar" icon="pi pi-file-export" styleClass="w-full" />
          </div>
        </div>
      </p-card>

      <!-- Estadísticas -->
      <div class="stats-grid">
        <p-card styleClass="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <span class="stat-label">Total Estudiantes</span>
              <span class="stat-value">245</span>
            </div>
            <div class="stat-icon stat-icon-blue">
              <i class="pi pi-users"></i>
            </div>
          </div>
        </p-card>

        <p-card styleClass="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <span class="stat-label">Total Profesores</span>
              <span class="stat-value">28</span>
            </div>
            <div class="stat-icon stat-icon-green">
              <i class="pi pi-book"></i>
            </div>
          </div>
        </p-card>

        <p-card styleClass="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <span class="stat-label">Cursos Activos</span>
              <span class="stat-value">42</span>
            </div>
            <div class="stat-icon stat-icon-orange">
              <i class="pi pi-bookmark"></i>
            </div>
          </div>
        </p-card>

        <p-card styleClass="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <span class="stat-label">Pagos Pendientes</span>
              <span class="stat-value">12</span>
            </div>
            <div class="stat-icon stat-icon-red">
              <i class="pi pi-wallet"></i>
            </div>
          </div>
        </p-card>
      </div>

      <!-- Tabla -->
      <p-card header="Historial de Reportes" styleClass="tabla-card">
        <p-table [value]="reportes" [paginator]="true" [rows]="10" styleClass="p-datatable-sm">
          <ng-template pTemplate="header">
            <tr>
              <th>Reporte</th>
              <th>Tipo</th>
              <th>Fecha Generación</th>
              <th>Estado</th>
              <th style="width: 8rem">Acciones</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-reporte>
            <tr>
              <td>{{ reporte.nombre }}</td>
              <td>
                <p-tag 
                  [value]="reporte.tipo" 
                  [severity]="getTipoSeverity(reporte.tipo)" />
              </td>
              <td>{{ reporte.fecha }}</td>
              <td>
                <p-tag 
                  [value]="reporte.estado" 
                  [severity]="getEstadoSeverity(reporte.estado)" />
              </td>
              <td>
                <div class="action-buttons">
                  <p-button icon="pi pi-download" [text]="true" severity="secondary" size="small" />
                  <p-button icon="pi pi-eye" [text]="true" severity="secondary" size="small" />
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="5" class="text-center">No hay reportes disponibles</td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styles: [`
    .reportes-container {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .header h1 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      color: #111827;
    }

    .header p {
      color: #6b7280;
      margin: 0.25rem 0 0;
      font-size: 0.875rem;
    }

    .filtros-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      align-items: end;
    }

    .filtro-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .filtro-item label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }

    .stat-card {
      padding: 1rem;
    }

    .stat-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .stat-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      margin-top: 0.25rem;
    }

    .stat-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon-blue {
      background: #e0e7ff;
    }

    .stat-icon-blue i {
      color: #6366f1;
      font-size: 1.25rem;
    }

    .stat-icon-green {
      background: #d1fae5;
    }

    .stat-icon-green i {
      color: #10b981;
      font-size: 1.25rem;
    }

    .stat-icon-orange {
      background: #fef3c7;
    }

    .stat-icon-orange i {
      color: #f59e0b;
      font-size: 1.25rem;
    }

    .stat-icon-red {
      background: #ffe4e6;
    }

    .stat-icon-red i {
      color: #f43f5e;
      font-size: 1.25rem;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    :host ::ng-deep .w-full {
      width: 100%;
    }

    /* Dark mode */
    :host-context(.dark-mode) .header h1 {
      color: #f9fafb;
    }

    :host-context(.dark-mode) .header p {
      color: #9ca3af;
    }

    :host-context(.dark-mode) .filtro-item label {
      color: #d1d5db;
    }

    :host-context(.dark-mode) .stat-label {
      color: #9ca3af;
    }

    :host-context(.dark-mode) .stat-value {
      color: #f9fafb;
    }
  `]
})
export class ReportesComponent {
  periodos = [
    { label: 'Este mes', value: 'mes' },
    { label: 'Este trimestre', value: 'trimestre' },
    { label: 'Este año', value: 'anio' }
  ];
  
  periodoSeleccionado = 'mes';
  fechaInicio: Date = new Date(2026, 0, 1);
  fechaFin: Date = new Date();

  reportes = [
    { nombre: 'Reporte de Matrículas - Enero 2026', tipo: 'Académico', fecha: '01/02/2026', estado: 'Completado' },
    { nombre: 'Estado de Pagos - Febrero 2026', tipo: 'Financiero', fecha: '15/02/2026', estado: 'Completado' },
    { nombre: 'Asistencia Enero 2026', tipo: 'Asistencia', fecha: '01/02/2026', estado: 'Completado' },
    { nombre: 'Reporte de Calificaciones', tipo: 'Académico', fecha: '20/03/2026', estado: 'Pendiente' },
    { nombre: 'Resumen Financiero Q1', tipo: 'Financiero', fecha: '25/03/2026', estado: 'Pendiente' },
  ];

  getTipoSeverity(tipo: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (tipo) {
      case 'Académico': return 'info';
      case 'Financiero': return 'success';
      case 'Asistencia': return 'warn';
      default: return 'secondary';
    }
  }

  getEstadoSeverity(estado: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (estado) {
      case 'Completado': return 'success';
      case 'Pendiente': return 'warn';
      default: return 'secondary';
    }
  }
}