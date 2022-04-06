import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InsertEventTypeDtoReq } from '../../../../../../core/src/app/dto/event-type/insert-event-type-dto-req';
import { insertEventTypeAction } from '../../../../../../core/src/app/state/event-type/event-type.action';
import { eventTypeSelectorInsert } from '../../../../../../core/src/app/state/event-type/event-type.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-type-save',
  templateUrl: './event-type-save.component.html',
  styleUrls: ['./event-type-save.component.css']
})
export class EventTypeSaveComponent implements OnInit, OnDestroy {

  data: InsertEventTypeDtoReq = new InsertEventTypeDtoReq()
  eventTypeInsertSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store) {
    this.title.setTitle('Add Event Type')
  }

  ngOnInit(): void {
  }

  insertProgress(): void {
    this.eventTypeInsertSubscription = this.store.select(eventTypeSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/event-type/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertEventTypeAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.eventTypeInsertSubscription?.unsubscribe()
  }
}
