import { Component, Input, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart-service/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-today-card',
  templateUrl: './today-card.component.html',
  styleUrls: ['./today-card.component.css'],
})
export class TodayCardComponent implements OnInit {
  @Input() item!: any;
  userId!: string;

  constructor(
    config: NgbRatingConfig,
    private toastr: ToastrService,
    private cartService: CartService,
    private authService: AuthService
  ) {
    config.max = 5;
    config.readonly = true;
    this.userId = this.authService.getUserData().id;
  }

  ngOnInit(): void {}

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
}
