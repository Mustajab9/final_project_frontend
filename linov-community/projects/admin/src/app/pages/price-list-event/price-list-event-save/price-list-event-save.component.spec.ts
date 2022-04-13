import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PriceListEventSaveComponent } from './price-list-event-save.component'

describe('PriceListEventSaveComponent', () => {
  let component: PriceListEventSaveComponent
  let fixture: ComponentFixture<PriceListEventSaveComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListEventSaveComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListEventSaveComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
