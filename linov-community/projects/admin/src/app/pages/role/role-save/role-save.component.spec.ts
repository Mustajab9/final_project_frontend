import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RoleSaveComponent } from './role-save.component'

describe('RoleSaveComponent', () => {
  let component: RoleSaveComponent
  let fixture: ComponentFixture<RoleSaveComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleSaveComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSaveComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
