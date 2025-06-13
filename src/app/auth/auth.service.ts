import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { decode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roleSubject = new BehaviorSubject<string | null>(this.getRoleFromSession());
  public role$ = this.roleSubject.asObservable();

  constructor() { }

  setRole(role: string): void {
    sessionStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

  getRoleFromSession(): string | null {
    return sessionStorage.getItem('role');
  }

  getRole(): string | null {
    return this.roleSubject.value;
  }

  clear(): void {
    sessionStorage.clear();
    this.roleSubject.next(null);
  }

  decodeToken(token: string): any {
    try {
      const decoded = jwtDecode(token);
      sessionStorage.setItem('id', decoded?.sub || '')
      return decoded?.sub;
    } catch (error) {
      console.error('Token decoding failed', error);
      return null;
    }
  }
}
