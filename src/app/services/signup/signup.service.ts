import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  signUp(username: string, email: string | null, password: string | null) {
    const body = { username, email, password };
    return this.http.post('http://localhost:5000/register', body).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(
          () => new Error('Something went wrong while creating user.')
        );
      })
    );
  }
}
