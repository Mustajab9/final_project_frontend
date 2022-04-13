import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavfootComponent } from './navfoot.component'

describe('NavfootComponent', () => {
  let component: NavfootComponent
  let fixture: ComponentFixture<NavfootComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavfootComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavfootComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
