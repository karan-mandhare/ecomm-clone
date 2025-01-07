import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  product = {
    imgUrl:
      'https://static.vecteezy.com/system/resources/previews/013/484/906/non_2x/wireless-headphones-side-view-gray-icon-on-a-transparent-background-3d-rendering-png.png',
    percentage: 20,
    name: 'Wireless Headphones',
    reducedPrice: 1599,
    actualPrice: 1999,
    rating: 4.5,
    available: true,
    reviews: 200,
    desc: 'High-quality wireless headphones with noise-cancellation technology, long battery life, and ergonomic design for comfortable extended use.',
    colors: ['red', 'blue'],
    size: ['XS', 'S', 'M', 'L', 'XL'],
    quantity: 2,
    wishlist: true,
  };

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {}
}
