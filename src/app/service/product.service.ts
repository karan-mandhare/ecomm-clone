import { Injectable } from '@angular/core';
import { CommonhttpService } from './commonhttp.service';
import { BaseUrlsService } from './base-urls.service';
import { CommonResponse } from '../model/CommonResponse';
import { HttpParams } from '@angular/common/http';
import { Product } from '../model/Product';
import { BehaviorSubject } from 'rxjs';
import { WishlistService } from './wishlist.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl!: string;
  private productSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productSubject.asObservable();
  products!: Product[];
  wishtList!: Product[];

  constructor(private httpService: CommonhttpService, private url: BaseUrlsService, private wishListService: WishlistService) {
    this.apiUrl = this.url.getBaseUrl('admin') + '' + this.url.getBaseUrl('product')
    this.wishListService.wishList$.subscribe((list) => {
      this.wishtList = list;
    })
    this.getProducts()
  }

  ngOnInit() {

  }

  addProduct(form: FormData, callback: Function) {
    let url = this.apiUrl + '/add-product';

    this.httpService.httpPost(url, form, (result: CommonResponse<any>) => {
      if (callback) {
        callback(result)
      }
    })
  }

  getProducts(callback?: Function) {
    let url = this.apiUrl + '/get-products'
    let params = new HttpParams;
    this.httpService.httpGet(url, params, (result: CommonResponse<Product[]>) => {
      if (result?.success && result?.data) {
        this.products = result.data?.map((product: Product) => {
          const wishlistFlag = this.wishtList.some((list) => list.id === product.id);
          return {
            ...product,
            wishlistFlag: wishlistFlag
          }
        });
        this.productSubject.next(this.products)
      }
      if (callback) {
        callback(result)
      }
    })
  }

  getProductsByCategory(id: number, callback: Function) {
    let url = this.apiUrl + `/get-products/${id}`
    let params = new HttpParams;
    this.httpService.httpGet(url, params, (result: CommonResponse<Product>) => {
      if (callback) {
        callback(result)
      }
    })
  }

  deleteProductById(id: number, callback: Function) {
    let url = this.apiUrl + `/delete-product`
    let params = new HttpParams().set('id', id);
    this.httpService.httpDelete(url, params, (result: CommonResponse<Product>) => {
      if (callback) {
        callback(result)
      }
    })
  }
}
