import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PriceListEventUpdateComponent } from './price-list-event-update.component'

describe('PriceListEventUpdateComponent', () => {
  let component: PriceListEventUpdateComponent
  let fixture: ComponentFixture<PriceListEventUpdateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListEventUpdateComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListEventUpdateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
