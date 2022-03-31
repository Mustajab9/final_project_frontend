import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegencyUpdateComponent } from './regency-update.component';

describe('RegencyUpdateComponent', () => {
  let component: RegencyUpdateComponent;
  let fixture: ComponentFixture<RegencyUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegencyUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegencyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
