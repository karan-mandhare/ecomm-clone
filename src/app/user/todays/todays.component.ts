import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonResponse } from 'src/app/model/CommonResponse';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/service/product.service';
import { WishlistService } from 'src/app/service/wishlist.service';


@Component({
  selector: 'app-todays',
  templateUrl: './todays.component.html',
  styleUrls: ['./todays.component.css'],
})
export class TodaysComponent implements OnInit {
  @Input() title!: string;
  @Input() head!: string;
  products: Product[] = []
  userId!: number;

  constructor(private productService: ProductService, private wishListService: WishlistService) {
    let id = sessionStorage.getItem('id');
    this.userId = Number(id)
  }

  @ViewChild('cardContainer', { static: false }) cardContainer!: ElementRef;

  scrollRight(): void {
    this.cardContainer.nativeElement.scrollBy({
      left: 1000,
      behavior: 'smooth',
    });
  }

  scrollLeft(): void {
    this.cardContainer.nativeElement.scrollBy({
      left: -1000,
      behavior: 'smooth',
    });
  }


  ngOnInit(): void {
    this.getProducts();
  }

  wishListUpdated() {
    this.productService.getProducts();
  }

  getProducts() {
    this.productService.products$.subscribe((product) => {
      this.products = product;
    })
  }
}
