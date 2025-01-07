import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: any;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  ngOnInit(): void {}

  onViewClick() {}

  onEditClick() {
    this.edit.emit(this.product);
  }

  onDeleteClick() {
    this.delete.emit(this.product);
  }
}
