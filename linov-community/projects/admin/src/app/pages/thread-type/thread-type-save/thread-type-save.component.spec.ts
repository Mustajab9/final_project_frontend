import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadTypeSaveComponent } from './thread-type-save.component';

describe('ThreadTypeSaveComponent', () => {
  let component: ThreadTypeSaveComponent;
  let fixture: ComponentFixture<ThreadTypeSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadTypeSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadTypeSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
