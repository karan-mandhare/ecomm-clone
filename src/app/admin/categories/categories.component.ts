import { Component, OnInit, Output } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  category: any[] = [];
  product: any[] = [];
  selected: any;
  deletedCatId: any;
  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (val: any) => {
        this.category = val.data.data;
      },
    });
  }

  updateCategories() {
    this.getCategories();
  }

  selectedCategory(cat: any) {
    this.selected = cat;

    this.productService.getProductByCat(cat._id).subscribe({
      next: (val: any) => {
        this.product = val.data;
        console.log('prod', val.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editCategory(id: any) {
    console.log('edit', id);
  }

  setDeletedCat(id: any) {
    this.deletedCatId = id;
  }
  deleteCategory() {
    console.log('deleted');
    this.categoryService.deleteCategory(this.deletedCatId).subscribe({
      next: (val: any) => {
        this.getCategories();
        this.toastr.success(val.message);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message);
      },
    });
  }
}
