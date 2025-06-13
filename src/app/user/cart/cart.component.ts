import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart-service/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId!: string;
  private cartSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCart(this.userId).subscribe();
  }

  billingDetails() {
    this.router.navigate(['user/billing-details']);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
