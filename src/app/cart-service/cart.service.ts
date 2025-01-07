import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();
  cart: any[] = [];

  constructor(private http: HttpClient) {}

  getCart(userId: string) {
    return this.http.get(`${environment.apiurl}/cart/${userId}`).pipe(
      tap((cart: any) => {
        this.cartSubject.next(cart.items);
      })
    );
  }

  updateCart(userId: string, products: any[]) {
    return this.http
      .post(`${environment.apiurl}/cart/${userId}/items`, {
        products,
      })
      .pipe(
        tap((cart: any) => {
          this.cartSubject.next(cart.items);
        })
      );
  }

  removeProduct(userId: string, productId: string) {
    return this.http
      .delete(`${environment.apiurl}/cart/${userId}/item/${productId}`)
      .pipe(
        tap((cart: any) => {
          this.cartSubject.next(cart.items);
        })
      );
  }

  clearCart(userId: string) {
    return this.http.delete(`${environment.apiurl}}/cart/${userId}/items`).pipe(
      tap((cart: any) => {
        this.cartSubject.next(cart.items);
      })
    );
  }
}
