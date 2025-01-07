import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingProductsItemsComponent } from './selling-products-items.component';

describe('SellingProductsItemsComponent', () => {
  let component: SellingProductsItemsComponent;
  let fixture: ComponentFixture<SellingProductsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingProductsItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellingProductsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
