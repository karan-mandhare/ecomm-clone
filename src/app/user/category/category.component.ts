import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { CommonResponse } from 'src/app/model/CommonResponse';
import { Product } from 'src/app/model/Product';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  prodByCat: Product[] = [];

  flag: boolean = true;

  collapsed: boolean[] = [];
  constructor(
    private categoryService: CategoryService
    // private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories((result: CommonResponse<Category[]>) => {
      if (result?.success) {
        this.categories = result?.data;
      }
    })
  }

  @ViewChild('categoryContainer', { static: false })
  categoryContainer!: ElementRef;

  scrollRight(): void {
    this.categoryContainer.nativeElement.scrollBy({
      left: 500,
      behavior: 'smooth',
    });
  }

  scrollLeft(): void {
    this.categoryContainer.nativeElement.scrollBy({
      left: -500,
      behavior: 'smooth',
    });
  }

  toggleCollapse(cat: any, index: number): void {
    this.collapsed = this.collapsed.map(
      (_, idx) => idx === index && !this.collapsed[idx]
    );
    // this.flag = this.categories.some((val) => val === true);
    // this.productService.getProductByCat(cat._id).subscribe({
    //   next: (val: any) => {
    //     this.prodByCat = val.data;
    //   },
    // });
    console.log('collapsed', this.collapsed);
  }
}
