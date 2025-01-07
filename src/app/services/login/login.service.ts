import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // login
  loginUser(email: string | null, password: string | null) {
    const body = { email, password };
    return this.http.post('http://localhost:5000/login', body).pipe(
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }
}
