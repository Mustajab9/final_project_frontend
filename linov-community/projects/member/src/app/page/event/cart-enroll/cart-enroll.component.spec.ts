import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartEnrollComponent } from './cart-enroll.component';

describe('CartEnrollComponent', () => {
  let component: CartEnrollComponent;
  let fixture: ComponentFixture<CartEnrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartEnrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
