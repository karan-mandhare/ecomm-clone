import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../guards/auth.guard';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RightCarouselComponent } from './right-carousel/right-carousel.component';
import { TodaysComponent } from './todays/todays.component';
import { TodayCardComponent } from './today-card/today-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './category/category.component';
import { SellingProductsComponent } from './selling-products/selling-products.component';
import { SellingProductsItemsComponent } from './selling-products-items/selling-products-items.component';
import { NewArrivalComponent } from './new-arrival/new-arrival.component';
import { ServicesContComponent } from './services-cont/services-cont.component';
import { WishlistComponent } from './wishlist/wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';

import { BillingPageComponent } from './billing-page/billing-page.component';
import { MyProfileComponent } from './profile/my-profile/my-profile.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const userRoute: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' },
    children: [
      {
        path: '',
        component: UserDashboardComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'billing-details',
        component: BillingPageComponent,
      },
      {
        path: 'profile',
        component: MyProfileComponent,
      },
      {
        path: 'product',
        component: ProductPageComponent,
      },
    ]
  },

];

@NgModule({
  declarations: [
    ServicesContComponent,
    RightCarouselComponent,
    UserComponent,
    TodaysComponent,
    TodayCardComponent,
    CategoryComponent,
    SellingProductsComponent,
    SellingProductsItemsComponent,
    NewArrivalComponent,
    ServicesContComponent,
    WishlistComponent,
    BillingPageComponent,
    ProductPageComponent,
    UserDashboardComponent,
  ],
  imports: [CommonModule, NgbModule, RouterModule, RouterModule.forChild(userRoute)],
  exports: [RouterModule],
})
export class UserModule { }
