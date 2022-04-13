import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SocialMediaSaveComponent } from './social-media-save.component'

describe('SocialMediaSaveComponent', () => {
  let component: SocialMediaSaveComponent
  let fixture: ComponentFixture<SocialMediaSaveComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaSaveComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaSaveComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
