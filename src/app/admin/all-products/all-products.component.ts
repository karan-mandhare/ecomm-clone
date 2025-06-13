import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from 'src/app/model/CommonResponse';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products!: Product[];

  deleteProd!: Product;
  editProd!: Product;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {

    this.productService.getProducts((result: CommonResponse<any>) => {
      if (result?.success) {
        this.products = result?.data;
      }
    })
  }

  openDeleteModal(product: Product) {
    this.deleteProd = product;
  }

  openEditModal(product: Product) {
    this.editProd = product;

    console.log(this.editProd);
  }

  deleteProduct() {
    this.productService.deleteProductById(this.deleteProd?.id, (result: CommonResponse<Product>) => {
      if (result?.success) {
        this.toastr.success(result?.message);
        this.getAllProducts()
      }
    })
  }

  updateProducts() {
    this.getAllProducts();
  }
}
