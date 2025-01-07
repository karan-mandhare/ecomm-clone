import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products!: any;

  deleteProd: any = null;
  editProd: any = null;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: (val: any) => {
        this.products = val?.data?.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openDeleteModal(product: any) {
    this.deleteProd = product;
  }

  openEditModal(product: any) {
    this.editProd = product;

    console.log(this.editProd);
  }

  deleteProduct() {
    this.productService.deleteProduct(this.deleteProd._id).subscribe({
      next: (val: any) => {
        this.toastr.success(val.message);
        this.getAllProducts();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message);
      },
    });
  }

  updateProducts() {
    this.getAllProducts();
  }
}
