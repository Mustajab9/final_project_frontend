import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSaveComponent } from './profile-save.component';

describe('ProfileSaveComponent', () => {
  let component: ProfileSaveComponent;
  let fixture: ComponentFixture<ProfileSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
