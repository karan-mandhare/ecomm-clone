import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private userData: any = null;

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  saveToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  clearToken(): void {
    sessionStorage.removeItem('authoToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const token = this.getToken();

    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.role || null;
    }
    return null;
  }

  getUserData(): any {
    if (!this.userData) {
      const token = this.getToken();

      if (token) {
        this.userData = jwtDecode(token);
      }
    }
    return this.userData;
  }
}
