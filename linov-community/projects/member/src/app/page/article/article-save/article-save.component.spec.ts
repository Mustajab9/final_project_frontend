import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSaveComponent } from './article-save.component';

describe('ArticleSaveComponent', () => {
  let component: ArticleSaveComponent;
  let fixture: ComponentFixture<ArticleSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
