import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  updateCart(id: any) {
    return this.http.post(`${environment.apiurl}/update-cart`, { id: id });
  }
}
