import { Component, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/model/Category';
import { CommonResponse } from 'src/app/model/CommonResponse';
import { Product } from 'src/app/model/Product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  category!: Category[];
  product!: Product[];
  selectedCatProduct!: Product[];
  selected!: number;
  deletedCat!: Category;
  constructor(
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories((result: CommonResponse<Category[]>) => {
      if (result.success) {
        this.category = result?.data;
      }
    })
  }

  updateCategories() {
    this.getCategories();
  }

  selectedCategory(cat: Category) {
    this.productService.getProductsByCategory(cat?.id, (result: CommonResponse<Product[]>) => {
      if (result?.success) {
        this.selected = cat?.id;
        this.selectedCatProduct = result?.data;
      }
    })
  }

  editCategory(id: any) {
    console.log('edit', id);
  }

  setDeletedCat(cat: Category) {
    this.deletedCat = cat;
  }
  deleteCategory() {
    this.categoryService.deleteCategoryById(this.deletedCat?.id, (result: CommonResponse<Category>) => {
      if (result?.success) {
        this.toastr.success(result?.message)
        this.getCategories();
      } else {
        this.toastr.error(result?.message)
      }
    })
  }
}
