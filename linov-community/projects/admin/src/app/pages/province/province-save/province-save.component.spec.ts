import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceSaveComponent } from './province-save.component';

describe('ProvinceSaveComponent', () => {
  let component: ProvinceSaveComponent;
  let fixture: ComponentFixture<ProvinceSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinceSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
