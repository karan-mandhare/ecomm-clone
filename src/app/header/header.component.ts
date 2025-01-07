import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart-service/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartLen!: number;
  userData!: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart(this.userData?.id).subscribe((data: any) => {
      this.cartLen = data.items.length;
    });
  }

  wishlistClick() {
    this.router.navigate(['user', 'wishlist']);
  }
  cartClick() {
    this.router.navigate(['user', 'cart']);
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['login']);
  }
}
