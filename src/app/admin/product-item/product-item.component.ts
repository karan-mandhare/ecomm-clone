import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  ngOnInit(): void { }

  onViewClick() { }

  onEditClick() {
    this.edit.emit(this.product);
  }

  onDeleteClick() {
    this.delete.emit(this.product);
  }
}
