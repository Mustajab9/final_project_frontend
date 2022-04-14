import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'

import { InsertEventTypeDtoReq } from '../../../../../../core/src/app/dto/event-type/insert-event-type-dto-req'
import { insertEventTypeAction } from '../../../../../../core/src/app/state/event-type/event-type.action'
import { eventTypeSelectorInsert } from '../../../../../../core/src/app/state/event-type/event-type.selector'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'


@Component({
  selector: 'app-event-type-save',
  templateUrl: './event-type-save.component.html',
  styleUrls: ['./event-type-save.component.css']
})
export class EventTypeSaveComponent implements OnInit, OnDestroy {

  data: InsertEventTypeDtoReq = new InsertEventTypeDtoReq()
  isLoading: boolean = false

  eventTypeInsertSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store, private loadingService: LoadingService) {
    this.title.setTitle('Add Event Type')
  }

  ngOnInit(): void {
    this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })
  }

  insertProgress(): void {
    this.eventTypeInsertSubscription = this.store.select(eventTypeSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/event-type/list')
      }
    })
  }

  onSubmit(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(insertEventTypeAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.eventTypeInsertSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
