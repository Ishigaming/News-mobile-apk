import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

export interface User {
  name: string;
  lastName: string;
  email: string;
  password: string; // contraseña encriptada
  nationality?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Obtener todos los usuarios registrados desde localStorage
  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  // Guardar todos los usuarios en localStorage
  private saveUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  register(name: string, lastName: string, email: string, password: string, confirmPassword: string, nationality?: string): boolean {
    if (password !== confirmPassword) return false;

    const users = this.getUsers();

    if (users.find(u => u.email === email)) {
      return false; // usuario ya existe
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();

    const newUser: User = { name, lastName, email, password: hashedPassword, nationality };

    users.push(newUser);
    this.saveUsers(users);

    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const hashedPassword = CryptoJS.SHA256(password).toString();

    const user = users.find(u => u.email === email && u.password === hashedPassword);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // usuario logueado
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
