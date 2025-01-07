import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/admin/services/product.service';

@Component({
  selector: 'app-todays',
  templateUrl: './todays.component.html',
  styleUrls: ['./todays.component.css'],
})
export class TodaysComponent implements OnInit {
  @Input() title!: string;
  @Input() head!: string;
  cards: any[] = [];

  @ViewChild('cardContainer', { static: false }) cardContainer!: ElementRef;

  scrollRight(): void {
    this.cardContainer.nativeElement.scrollBy({
      left: 1000,
      behavior: 'smooth',
    });
  }

  scrollLeft(): void {
    this.cardContainer.nativeElement.scrollBy({
      left: -1000,
      behavior: 'smooth',
    });
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (val: any) => {
        this.cards = val?.data?.data;
        console.log(val.data.data);
      },
    });
  }
}
