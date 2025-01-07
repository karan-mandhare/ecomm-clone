import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  createCategory(cat: any) {
    return this.http.post(`${environment.apiurl}/admin/create-category`, cat);
  }

  getCategories() {
    return this.http.get(`${environment.apiurl}/get-category`);
  }

  deleteCategory(id: any) {
    return this.http.delete(
      `${environment.apiurl}/admin/delete-category/${id}`
    );
  }
}
