import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaUpdateComponent } from './social-media-update.component';

describe('SocialMediaUpdateComponent', () => {
  let component: SocialMediaUpdateComponent;
  let fixture: ComponentFixture<SocialMediaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
