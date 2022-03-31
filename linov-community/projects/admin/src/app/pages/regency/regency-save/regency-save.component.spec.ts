import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegencySaveComponent } from './regency-save.component';

describe('RegencySaveComponent', () => {
  let component: RegencySaveComponent;
  let fixture: ComponentFixture<RegencySaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegencySaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegencySaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
