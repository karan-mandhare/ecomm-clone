import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  flag: boolean = false;
  products: any[] = [];
  cards: any[] = [
    {
      imgUrl:
        'https://static.vecteezy.com/system/resources/previews/013/484/906/non_2x/wireless-headphones-side-view-gray-icon-on-a-transparent-background-3d-rendering-png.png',
      percentage: 20,
      name: 'Wireless Headphones',
      reducedPrice: 1599,
      actualPrice: 1999,
      rating: 4.5,
    },
    {
      imgUrl: 'https://example.com/image2.jpg',
      percentage: 30,
      name: 'Smartphone Stand',
      reducedPrice: 349,
      actualPrice: 499,
      rating: 4.2,
    },
    {
      imgUrl: 'https://example.com/image3.jpg',
      percentage: 15,
      name: 'Gaming Mouse',
      reducedPrice: 849,
      actualPrice: 999,
      rating: 4.7,
    },
    {
      imgUrl: 'https://example.com/image4.jpg',
      percentage: 25,
      name: 'Bluetooth Speaker',
      reducedPrice: 1499,
      actualPrice: 1999,
      rating: 4.3,
    },
    {
      imgUrl: 'https://example.com/image5.jpg',
      percentage: 10,
      name: 'Laptop Cooling Pad',
      reducedPrice: 899,
      actualPrice: 999,
      rating: 4.1,
    },
    {
      imgUrl: 'https://example.com/image6.jpg',
      percentage: 35,
      name: 'Power Bank 20000mAh',
      reducedPrice: 1299,
      actualPrice: 1999,
      rating: 4.6,
    },
    {
      imgUrl: 'https://example.com/image7.jpg',
      percentage: 18,
      name: 'Portable Hard Drive 1TB',
      reducedPrice: 4099,
      actualPrice: 4999,
      rating: 4.8,
    },
    {
      imgUrl: 'https://example.com/image8.jpg',
      percentage: 22,
      name: 'Noise-Cancelling Earbuds',
      reducedPrice: 2799,
      actualPrice: 3599,
      rating: 4.4,
    },
    {
      imgUrl: 'https://example.com/image9.jpg',
      percentage: 12,
      name: 'Ergonomic Office Chair',
      reducedPrice: 7999,
      actualPrice: 8999,
      rating: 4.5,
    },
    {
      imgUrl: 'https://example.com/image10.jpg',
      percentage: 28,
      name: '4K Action Camera',
      reducedPrice: 6499,
      actualPrice: 8999,
      rating: 4.6,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.getProductItems();
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
