import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionSaveComponent } from './position-save.component';

describe('PositionSaveComponent', () => {
  let component: PositionSaveComponent;
  let fixture: ComponentFixture<PositionSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
