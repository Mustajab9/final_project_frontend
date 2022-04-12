import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSaveComponent } from './course-save.component';

describe('CourseSaveComponent', () => {
  let component: CourseSaveComponent;
  let fixture: ComponentFixture<CourseSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
