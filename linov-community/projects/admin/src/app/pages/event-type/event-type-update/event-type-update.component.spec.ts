import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeUpdateComponent } from './event-type-update.component';

describe('EventTypeUpdateComponent', () => {
  let component: EventTypeUpdateComponent;
  let fixture: ComponentFixture<EventTypeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTypeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
