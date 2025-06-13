import { Component, OnInit } from '@angular/core';
import { CommonResponse } from 'src/app/model/CommonResponse';
import { Product } from 'src/app/model/Product';
import { WishlistService } from 'src/app/service/wishlist.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  flag: boolean = false;
  products: Product[] = [];
  cards!: Product[];
  userId!: number;

  constructor(private wishListService: WishlistService) {
    let id = sessionStorage.getItem('id');
    this.userId = Number(id);
  }

  ngOnInit(): void {
    this.getListWishList();
  }

  getListWishList() {
    this.wishListService.wishList$.subscribe((list) => {
      this.products = list;
    })
  }

  getProductItems() {
    if (this.flag) {
      this.products = this.cards;
    } else {
      this.products = this.cards.filter((_, index) => index <= 3);
    }
  }

  viewAllProd(): void {
    this.flag = true;
    this.getProductItems();
  }
}
