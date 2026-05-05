import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../core/services/auth.service';
import { ThemeService } from '../core/services/theme.service';

interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string;
  items?: MenuItem[];
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, AvatarModule, MenuModule, RippleModule, TooltipModule],
  template: `
    <div class="layout" [class.dark-mode]="themeService.darkMode()">
      <aside class="sidebar" [class.collapsed]="sidebarCollapsed()">
        <div class="sidebar-header">
          @if (!sidebarCollapsed()) {
            <div class="logo">
              <i class="pi pi-school"></i>
              <span>Intranet</span>
            </div>
          } @else {
            <i class="pi pi-school logo-collapsed"></i>
          }
          <button class="toggle-btn" (click)="toggleSidebar()">
            <i class="pi" [class.pi-angle-left]="!sidebarCollapsed()" [class.pi-angle-right]="sidebarCollapsed()"></i>
          </button>
        </div>

        <nav class="sidebar-menu">
          @for (item of menuItems(); track item.label) {
            @if (!item.items) {
              <a 
                [routerLink]="item.routerLink" 
                routerLinkActive="active"
                class="menu-item"
                [pTooltip]="sidebarCollapsed() ? item.label : ''"
                tooltipPosition="right">
                <i class="pi" [class]="item.icon"></i>
                @if (!sidebarCollapsed()) {
                  <span>{{ item.label }}</span>
                }
              </a>
            } @else {
              <div class="menu-group">
                <div class="menu-group-header">
                  <i class="pi" [class]="item.icon"></i>
                  @if (!sidebarCollapsed()) {
                    <span>{{ item.label }}</span>
                    <i class="pi pi-chevron-down"></i>
                  }
                </div>
                @if (!sidebarCollapsed()) {
                  <div class="submenu">
                    @for (sub of item.items; track sub.label) {
                      <a 
                        [routerLink]="sub.routerLink" 
                        routerLinkActive="active"
                        class="submenu-item">
                        <i class="pi" [class]="sub.icon"></i>
                        <span>{{ sub.label }}</span>
                      </a>
                    }
                  </div>
                }
              </div>
            }
          }
        </nav>

        <div class="sidebar-footer">
          @if (authService.user(); as user) {
            <div class="user-info" [class.collapsed]="sidebarCollapsed()">
              <p-avatar 
                [image]="user.avatar" 
                shape="circle" 
                size="large" />
              @if (!sidebarCollapsed()) {
                <div class="user-details">
                  <span class="user-name">{{ user.nombre }} {{ user.apellido }}</span>
                  <span class="user-role">{{ user.rol | titlecase }}</span>
                </div>
              }
            </div>
          }
          <p-button 
            icon="pi pi-sign-out" 
            [pTooltip]="sidebarCollapsed() ? 'Cerrar Sesión' : ''"
            tooltipPosition="right"
            [text]="true" 
            severity="secondary"
            (onClick)="logout()"
            [disabled]="sidebarCollapsed()" />
        </div>
      </aside>

      <main class="main-content">
        <header class="topbar">
          <div class="breadcrumb">
            <span class="page-title">{{ currentPageTitle() }}</span>
          </div>
          <div class="topbar-actions">
            <p-button 
              [icon]="themeService.darkMode() ? 'pi pi-sun' : 'pi pi-moon'" 
              [text]="true" 
              severity="secondary"
              pTooltip="Cambiar tema"
              (onClick)="themeService.toggle()" />
            <p-button icon="pi pi-bell" [text]="true" severity="secondary" pTooltip="Notificaciones" />
            <p-button icon="pi pi-cog" [text]="true" severity="secondary" pTooltip="Configuración" />
          </div>
        </header>
        <div class="content">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: 100vh;
      background: #f8f9fa;
    }

    .sidebar {
      width: 260px;
      background: linear-gradient(180deg, #1e3a5f 0%, #2d4a6f 100%);
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease;
      position: fixed;
      height: 100vh;
      z-index: 100;
    }

    .sidebar.collapsed {
      width: 70px;
    }

    .sidebar-header {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: white;
    }

    .logo i {
      font-size: 1.5rem;
    }

    .logo span {
      font-size: 1.25rem;
      font-weight: 700;
    }

    .logo-collapsed {
      font-size: 1.5rem;
      color: white;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: rgba(255,255,255,0.7);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .toggle-btn:hover {
      color: white;
      background: rgba(255,255,255,0.1);
    }

    .sidebar-menu {
      flex: 1;
      padding: 1rem 0.5rem;
      overflow-y: auto;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      border-radius: 8px;
      margin-bottom: 0.25rem;
      transition: all 0.2s;
    }

    .menu-item:hover {
      background: rgba(255,255,255,0.1);
      color: white;
    }

    .menu-item.active {
      background: rgba(255,255,255,0.2);
      color: white;
      font-weight: 600;
    }

    .menu-item i {
      font-size: 1.1rem;
      width: 20px;
    }

    .menu-group {
      margin-bottom: 0.5rem;
    }

    .menu-group-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: rgba(255,255,255,0.6);
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .menu-group-header i:first-child {
      font-size: 1.1rem;
    }

    .menu-group-header span {
      flex: 1;
    }

    .menu-group-header i:last-child {
      font-size: 0.75rem;
    }

    .submenu {
      padding-left: 1rem;
    }

    .submenu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 1rem;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      border-radius: 6px;
      font-size: 0.9rem;
      transition: all 0.2s;
    }

    .submenu-item:hover {
      background: rgba(255,255,255,0.1);
      color: white;
    }

    .submenu-item.active {
      background: rgba(255,255,255,0.15);
      color: white;
    }

    .submenu-item i {
      font-size: 0.9rem;
    }

    .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1;
      overflow: hidden;
    }

    .user-info.collapsed {
      justify-content: center;
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      color: white;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .user-role {
      color: rgba(255,255,255,0.6);
      font-size: 0.75rem;
    }

    .main-content {
      flex: 1;
      margin-left: 260px;
      transition: margin-left 0.3s ease;
    }

    .sidebar.collapsed + .main-content {
      margin-left: 70px;
    }

    .topbar {
      height: 60px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .page-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e3a5f;
    }

    .topbar-actions {
      display: flex;
      gap: 0.5rem;
    }

    .content {
      padding: 1.5rem;
    }
  `]
})
export class LayoutComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  private router = inject(Router);
  
  sidebarCollapsed = signal(false);

  menuItems = computed<MenuItem[]>(() => {
    const user = this.authService.user();
    const rol = user?.rol;
    
    if (rol === 'director') {
      return [
        { label: 'Dashboard', icon: 'pi-home', routerLink: '/dashboard' },
        { label: 'Pagos', icon: 'pi-wallet', routerLink: '/director/pagos' },
        { label: 'Cursos', icon: 'pi-book', routerLink: '/director/cursos' },
        { label: 'Profesores', icon: 'pi-users', routerLink: '/director/profesores' },
        { label: 'Reportes', icon: 'pi-chart-bar', routerLink: '/director/reportes' }
      ];
    }
    
    if (rol === 'profesor') {
      return [
        { label: 'Dashboard', icon: 'pi-home', routerLink: '/dashboard' },
        { label: 'Mis Cursos', icon: 'pi-book', routerLink: '/profesor/cursos' },
        { label: 'Tareas', icon: 'pi-file', routerLink: '/profesor/tareas' },
        { label: 'Alumnos', icon: 'pi-users', routerLink: '/profesor/alumnos' },
        { label: 'Calendario', icon: 'pi-calendar', routerLink: '/profesor/calendario' },
        { label: 'Notas', icon: 'pi-chart-bar', routerLink: '/profesor/notas' }
      ];
    }
    
    if (rol === 'estudiante') {
      return [
        { label: 'Dashboard', icon: 'pi-home', routerLink: '/dashboard' },
        { label: 'Mis Cursos', icon: 'pi-book', routerLink: '/estudiante/cursos' },
        { label: 'Tareas', icon: 'pi-file', routerLink: '/estudiante/tareas' },
        { label: 'Calendario', icon: 'pi-calendar', routerLink: '/estudiante/calendario' },
        { label: 'Mis Notas', icon: 'pi-chart-bar', routerLink: '/estudiante/notas' }
      ];
    }

    return [];
  });

  currentPageTitle = computed(() => {
    const url = this.router.url;
    const user = this.authService.user();
    
    if (url.includes('dashboard')) {
      const rol = user?.rol || '';
      return `Dashboard - ${rol.charAt(0).toUpperCase() + rol.slice(1)}`;
    }
    if (url.includes('pagos')) return 'Gestión de Pagos';
    if (url.includes('/director/cursos')) return 'Administración de Cursos';
    if (url.includes('profesores')) return 'Gestión de Profesores';
    if (url.includes('reportes')) return 'Reportes';
    if (url.includes('/profesor/cursos')) return 'Mis Cursos';
    if (url.includes('/profesor/tareas')) return 'Gestión de Tareas';
    if (url.includes('/profesor/alumnos')) return 'Mis Alumnos';
    if (url.includes('/profesor/calendario')) return 'Calendario';
    if (url.includes('/profesor/notas')) return 'Registro de Notas';
    if (url.includes('/estudiante/cursos')) return 'Mis Cursos';
    if (url.includes('/estudiante/tareas')) return 'Mis Tareas';
    if (url.includes('/estudiante/calendario')) return 'Calendario';
    if (url.includes('/estudiante/notas')) return 'Mis Notas';
    return 'Intranet Escolar';
  });

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}