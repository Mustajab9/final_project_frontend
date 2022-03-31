import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListMemberSaveComponent } from './price-list-member-save.component';

describe('PriceListMemberSaveComponent', () => {
  let component: PriceListMemberSaveComponent;
  let fixture: ComponentFixture<PriceListMemberSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListMemberSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListMemberSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
