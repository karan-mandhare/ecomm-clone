import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart-service/cart.service';
import { CommonResponse } from 'src/app/model/CommonResponse';
import { Product } from 'src/app/model/Product';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-today-card',
  templateUrl: './today-card.component.html',
  styleUrls: ['./today-card.component.css'],
})
export class TodayCardComponent implements OnInit {

  @Input() item!: any;
  userId!: string;

  @Output() addedToWishlist = new EventEmitter<void>();

  constructor(
    config: NgbRatingConfig,
    private toastr: ToastrService,
    private cartService: CartService,
    private wishListService: WishlistService
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    console.log('item', this.item);

  }

  addToCart() {
    const prod = [
      {
        name: this.item.name,
        price: this.item.redPrice,
        image: this.item.image,
        productId: this.item._id,
        quantity: 1,
      },
    ];

    this.cartService.updateCart(this.userId, prod).subscribe({
      next: (val: any) => {
        this.toastr.success('added to cart');
      },
      error: (error) => {
        this.toastr.error('Failed to add product to cart.');
      },
    });
  }

  addToWishList(item: any) {
    this.wishListService.addToWishlist(item.id, (result: CommonResponse<Product>) => {
      if (result.success) {
        this.toastr.success(result.message)
        this.addedToWishlist.emit()
      }
    })
  }
}
