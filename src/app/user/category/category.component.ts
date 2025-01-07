import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/admin/services/category.service';
import { ProductService } from 'src/app/admin/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  prodByCat: any[] = [];

  flag: boolean = true;

  collapsed: boolean[] = [];
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (val: any) => {
        console.log('cat', val.data.data);
        this.categories = val?.data?.data;
        this.collapsed = this.categories.map(() => false);

        this.flag = this.categories.some((val) => val === true);
      },
    });
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
    this.flag = this.categories.some((val) => val === true);
    this.productService.getProductByCat(cat._id).subscribe({
      next: (val: any) => {
        this.prodByCat = val.data;
      },
    });
    console.log('collapsed', this.collapsed);
  }
}
