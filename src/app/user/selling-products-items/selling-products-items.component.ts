import { Component, Input, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-selling-products-items',
  templateUrl: './selling-products-items.component.html',
  styleUrls: ['./selling-products-items.component.css'],
})
export class SellingProductsItemsComponent implements OnInit {
  @Input() item!: any;

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    console.log(this.item);
  }
}
