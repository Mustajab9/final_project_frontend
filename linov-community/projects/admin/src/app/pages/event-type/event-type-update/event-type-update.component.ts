import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { UpdateEventTypeDtoReq } from '../../../../../../core/src/app/dto/event-type/update-event-type-dto-req'
import { updateEventTypeAction } from '../../../../../../core/src/app/state/event-type/event-type.action'
import { eventTypeSelectorById, eventTypeSelectorUpdate } from '../../../../../../core/src/app/state/event-type/event-type.selector'

@Component({
  selector: 'app-event-type-update',
  templateUrl: './event-type-update.component.html',
  styleUrls: ['./event-type-update.component.css']
})
export class EventTypeUpdateComponent implements OnInit, OnDestroy {

  data: UpdateEventTypeDtoReq = new UpdateEventTypeDtoReq()

  activatedRouteSubscription?: Subscription
  getByEventTypeIdSubscription?: Subscription
  updateEventTypeSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private store: Store) {
    this.title.setTitle('Update EventType')
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByEventTypeIdSubscription = this.store.select(eventTypeSelectorById(id)).subscribe(result => {
        this.data = { ...result }
      })
    })
  }

  updateProgress(): void {
    this.updateEventTypeSubscription = this.store.select(eventTypeSelectorUpdate).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/event-type/list')
      }
    })
  }

  onSubmit(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(updateEventTypeAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByEventTypeIdSubscription?.unsubscribe()
    this.updateEventTypeSubscription?.unsubscribe()
  }
}