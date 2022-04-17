import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EnrollSaveComponent } from './enroll-save.component'

describe('EnrollSaveComponent', () => {
  let component: EnrollSaveComponent
  let fixture: ComponentFixture<EnrollSaveComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollSaveComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollSaveComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
