import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListMemberUpdateComponent } from './price-list-member-update.component';

describe('PriceListMemberUpdateComponent', () => {
  let component: PriceListMemberUpdateComponent;
  let fixture: ComponentFixture<PriceListMemberUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListMemberUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListMemberUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
