import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart-service/cart.service';
import { AuthService } from '../auth/auth.service';

import { Product } from '../model/Product';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartLen!: number;
  userData!: any;
  role: string | null = null;
  userId!: Number;
  wishList: Product[] = []
  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private wishListService: WishlistService
  ) { }

  ngOnInit(): void {
    let id = sessionStorage.getItem('id')
    this.userId = Number(id);

    this.wishListService.wishList$.subscribe((list) => {
      this.wishList = list;
    })

    this.authService.role$.subscribe(role => {
      this.role = role;
    })
    this.role = sessionStorage.getItem('role') || '';
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
    this.authService.clear();
    this.router.navigate(['login']);
  }
}
