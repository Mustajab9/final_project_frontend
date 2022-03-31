import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListEventListComponent } from './price-list-event-list.component';

describe('PriceListEventListComponent', () => {
  let component: PriceListEventListComponent;
  let fixture: ComponentFixture<PriceListEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListEventListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
