import { ComponentFixture, TestBed } from '@angular/core/testing'

import { IndustrySaveComponent } from './industry-save.component'

describe('IndustrySaveComponent', () => {
  let component: IndustrySaveComponent
  let fixture: ComponentFixture<IndustrySaveComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustrySaveComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrySaveComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
