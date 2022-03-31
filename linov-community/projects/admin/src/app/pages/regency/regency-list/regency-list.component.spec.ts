import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegencyListComponent } from './regency-list.component';

describe('RegencyListComponent', () => {
  let component: RegencyListComponent;
  let fixture: ComponentFixture<RegencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegencyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
