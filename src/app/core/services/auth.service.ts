import { Injectable, signal } from '@angular/core';
import { User } from '../models';
import { JwtService } from './jwt.service';

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: User;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal<boolean>(false);
  private loading = signal<boolean>(false);

  user = this.currentUser.asReadonly();
  authenticated = this.isAuthenticated.asReadonly();
  isLoading = this.loading.asReadonly();

  private users: (User & { password: string })[] = [
    {
      id: 1,
      email: 'director@escuela.com',
      nombre: 'Director',
      apellido: 'Administrativo',
      rol: 'director',
      password: 'director123',
      avatar: 'https://ui-avatars.com/api/?name=Director+Admin&background=0D8ABC&color=fff'
    },
    {
      id: 2,
      email: 'profesor@escuela.com',
      nombre: 'Juan',
      apellido: 'Pérez',
      rol: 'profesor',
      password: 'profesor123',
      avatar: 'https://ui-avatars.com/api/?name=Juan+Perez&background=10B981&color=fff'
    },
    {
      id: 3,
      email: 'estudiante@escuela.com',
      nombre: 'María',
      apellido: 'García',
      rol: 'estudiante',
      password: 'estudiante123',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=F59E0B&color=fff'
    }
  ];

  constructor(private jwtService: JwtService) {
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const token = this.jwtService.getToken();
    const user = this.jwtService.getUser();
    
    if (token && user && !this.jwtService.isTokenExpired()) {
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
    } else {
      this.jwtService.removeToken();
    }
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    this.loading.set(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const foundUser = this.users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      const token = this.jwtService.generateMockToken(userWithoutPassword);

      this.jwtService.setToken(token);
      this.jwtService.setUser(userWithoutPassword);
      this.currentUser.set(userWithoutPassword);
      this.isAuthenticated.set(true);
      this.loading.set(false);

      return { success: true, user: userWithoutPassword };
    }

    this.loading.set(false);
    return { success: false, message: 'Credenciales inválidas' };
  }

  async register(data: {
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    rol?: 'estudiante' | 'profesor';
  }): Promise<RegisterResponse> {
    this.loading.set(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const exists = this.users.find(u => u.email === data.email);
    if (exists) {
      this.loading.set(false);
      return { success: false, message: 'El correo ya está registrado' };
    }

    const newUser: User & { password: string } = {
      id: this.users.length + 1,
      email: data.email,
      nombre: data.nombre,
      apellido: data.apellido,
      rol: data.rol || 'estudiante',
      password: data.password,
      avatar: `https://ui-avatars.com/api/?name=${data.nombre}+${data.apellido}&background=random`
    };

    this.users.push(newUser);
    this.loading.set(false);

    return { success: true, message: 'Usuario registrado exitosamente' };
  }

  logout(): void {
    this.jwtService.removeToken();
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  hasRole(roles: string[]): boolean {
    const user = this.currentUser();
    return user ? roles.includes(user.rol) : false;
  }
}