import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeSaveComponent } from './event-type-save.component';

describe('EventTypeSaveComponent', () => {
  let component: EventTypeSaveComponent;
  let fixture: ComponentFixture<EventTypeSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTypeSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
