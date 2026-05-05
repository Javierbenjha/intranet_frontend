import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profesor-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, RouterModule],
  template: `
    <div class="dashboard">
      <h1>Panel del Profesor</h1>
      
      <div class="stats">
        <p-card header="Mis Cursos">
          <span class="stat-value">5</span>
        </p-card>
        <p-card header="Total Alumnos">
          <span class="stat-value">120</span>
        </p-card>
        <p-card header="Tareas Pendientes">
          <span class="stat-value warning">3</span>
        </p-card>
        <p-card header="Calificaciones">
          <span class="stat-value">45</span>
        </p-card>
      </div>

      <div class="section">
        <p-card header="Mis Cursos Recientes">
          <div class="courses-list">
            @for (curso of misCursos; track curso.id) {
              <div class="course-item">
                <div class="course-info">
                  <strong>{{ curso.nivel | uppercase }} - Grado {{ curso.grado }}{{ curso.seccion }}</strong>
                  <span>{{ curso.nombre }}</span>
                </div>
                <div class="course-actions">
                  <p-tag [value]="curso.estado" [severity]="curso.estado === 'Activo' ? 'success' : 'warn'" />
                  <a [routerLink]="['/profesor/cursos', curso.id]" class="btn-view">Ver</a>
                </div>
              </div>
            }
          </div>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard h1 { margin-bottom: 1.5rem; }
    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #818cf8;
    }
    .stat-value.warning { color: #f59e0b; }
    .section { margin-top: 1.5rem; }
    .courses-list { display: flex; flex-direction: column; gap: 1rem; }
    .course-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: var(--bg-tertiary);
      border-radius: 8px;
    }
    .course-info { display: flex; flex-direction: column; }
    .course-info span { color: var(--text-secondary); font-size: 0.9rem; }
    .course-actions { display: flex; align-items: center; gap: 1rem; }
    .btn-view {
      padding: 0.5rem 1rem;
      background: #818cf8;
      color: white;
      border-radius: 4px;
      text-decoration: none;
    }
  `]
})
export class ProfesorDashboardComponent {
  misCursos = [
    { id: 1, nombre: 'Matemáticas', nivel: 'secundaria', grado: 3, seccion: 'A', estado: 'Activo' },
    { id: 2, nombre: 'Lenguaje', nivel: 'secundaria', grado: 2, seccion: 'B', estado: 'Activo' },
    { id: 3, nombre: 'Ciencias', nivel: 'primaria', grado: 5, seccion: 'A', estado: 'Activo' },
  ];
}