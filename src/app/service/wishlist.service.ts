import { Injectable } from '@angular/core';
import { CommonResponse } from '../model/CommonResponse';
import { HttpParams } from '@angular/common/http';
import { CommonhttpService } from './commonhttp.service';
import { BaseUrlsService } from './base-urls.service';
import { Product } from '../model/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishListSubject = new BehaviorSubject<Product[]>([]);
  public wishList$ = this.wishListSubject.asObservable();
  wishList: Product[] = [];
  userId!: number;

  constructor(public baseUrls: BaseUrlsService, public httpService: CommonhttpService) {
    let id = sessionStorage.getItem('id');
    this.userId = Number(id);

    if (this.userId) {
      this.getWishList()
    }
  }


  getWishList(callback?: Function) {
    let params = new HttpParams().set('userId', this.userId);
    let url = '/wishlist' + this.baseUrls.getBaseUrl('get-wishlist');

    this.httpService.httpGet(url, params, (result: CommonResponse<Product[]>) => {
      this.wishList = result.data;
      this.wishListSubject.next(this.wishList);
      if (callback) {
        callback(result)
      }
    })
  }

  addToWishlist(productId: number, callback?: Function) {
    let params = new HttpParams()

    let url = '/wishlist' + this.baseUrls.getBaseUrl('add-wishlist') + `/${this.userId}/${productId}`;

    this.httpService.httpPut(url, params, (result: CommonResponse<any>) => {
      this.getWishList()
      if (callback) {
        callback(result)
      }
    })
  }
}
