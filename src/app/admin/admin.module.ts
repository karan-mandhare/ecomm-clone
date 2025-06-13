import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../guards/auth.guard';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: AllProductsComponent,
      },
      {
        path: 'order',
        component: OrderListComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    SidenavComponent,
    AllProductsComponent,
    OrderListComponent,
    ProductItemComponent,
    AddProductComponent,
    AddCategoryComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(adminRoutes),
    ReactiveFormsModule,

  ],
  exports: [RouterModule, SidenavComponent],
})
export class AdminModule { }
