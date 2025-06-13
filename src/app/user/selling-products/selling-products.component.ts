import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-selling-products',
  templateUrl: './selling-products.component.html',
  styleUrls: ['./selling-products.component.css'],
})
export class SellingProductsComponent implements OnInit {
  flag: boolean = false;
  products: any[] = [];
  cards: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // this.productService.getProducts().subscribe({
    //   next: (val: any) => {
    //     this.cards = val?.data?.data.filter((i: any) => i.rating >= 4);
    //     console.log('cards', this.cards);
    //     this.getProductItems();
    //   },
    // });
  }

  getProductItems() {
    if (this.flag) {
      this.products = this.cards;
    } else {
      this.products = this.cards.filter((_, index) => index <= 3);
    }
    console.log('prd', this.products);
  }

  viewAllProd(): void {
    this.flag = true;
    this.getProductItems();
  }
}
