import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListMemberListComponent } from './price-list-member-list.component';

describe('PriceListMemberListComponent', () => {
  let component: PriceListMemberListComponent;
  let fixture: ComponentFixture<PriceListMemberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListMemberListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
