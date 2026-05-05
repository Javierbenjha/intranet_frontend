import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeKey = 'app_theme';
  
  darkMode = signal<boolean>(false);

  constructor() {
    // Cargar tema guardado o detectar preferencia del sistema
    const saved = localStorage.getItem(this.themeKey);
    if (saved) {
      this.darkMode.set(saved === 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkMode.set(true);
    }

    // Aplicar tema inmediatamente
    this.applyTheme(this.darkMode());

    // Effect para mantener sincronizado cuando cambie el estado
    effect(() => {
      const isDark = this.darkMode();
      this.applyTheme(isDark);
      localStorage.setItem(this.themeKey, isDark ? 'dark' : 'light');
    });
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  toggle(): void {
    this.darkMode.update(v => !v);
  }

  setDark(value: boolean): void {
    this.darkMode.set(value);
  }
}