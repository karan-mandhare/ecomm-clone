import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesContComponent } from './services-cont.component';

describe('ServicesContComponent', () => {
  let component: ServicesContComponent;
  let fixture: ComponentFixture<ServicesContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesContComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
