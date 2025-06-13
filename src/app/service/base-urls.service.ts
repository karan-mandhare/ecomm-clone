import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlsService {

  baseUrl = new Map<string, string>();

  constructor() {
    this.baseUrl.set('auth', '/api/auth');
    this.baseUrl.set('getusers', '/user/get/list');
    this.baseUrl.set('admin', '/admin');

    this.baseUrl.set('register', '/create-user');
    this.baseUrl.set('login', '/login');

    this.baseUrl.set('product', '/product');
    this.baseUrl.set('category', '/category');
    this.baseUrl.set('add-cat', '/add-category');
    this.baseUrl.set('add-prod', '/add-product');
    this.baseUrl.set('get-category', '/get-categories')

    this.baseUrl.set('add-wishlist', '/add/product');
    this.baseUrl.set('get-wishlist', '/get/products');
    this.baseUrl.set('remove-product', '/delete/product');

  }

  getBaseUrl(key: string) {
    return this.baseUrl.get(key)
  }

}
