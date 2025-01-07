import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  addProduct(prod: any) {
    return this.http.post(`${environment.apiurl}/admin/create-product`, prod);
  }

  getProducts() {
    return this.http.get(`${environment.apiurl}/get-product`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.apiurl}/delete/${id}`);
  }

  getProductById(id: number) {
    return this.http.get(`${environment.apiurl}/get-product/${id}`);
  }

  updateProduct(prod: any) {
    return this.http.post(`${environment.apiurl}/admin/update`, prod);
  }

  getProductByCat(id: any) {
    return this.http.get(`${environment.apiurl}/get-product/category/${id}`);
  }
}
