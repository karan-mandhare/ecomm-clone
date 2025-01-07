import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightCarouselComponent } from './right-carousel.component';

describe('RightCarouselComponent', () => {
  let component: RightCarouselComponent;
  let fixture: ComponentFixture<RightCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
