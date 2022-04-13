import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'

import { LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllEventDtoDataRes } from '../../../../../../core/src/app/dto/event/get-all-event-dto-data-res'
import { GetByEventIdDtoDataRes } from '../../../../../../core/src/app/dto/event/get-by-event-id-dto-data-res'
import { UpdateEventDtoReq } from '../../../../../../core/src/app/dto/event/update-event-dto-req'
import { EventService } from '../../../../../../core/src/app/service/event.service'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {

  data: GetAllEventDtoDataRes[] = []
  eventData: GetByEventIdDtoDataRes = new GetByEventIdDtoDataRes()
  update: UpdateEventDtoReq = new UpdateEventDtoReq()

  updateEventSubscription?: Subscription
  getAllEventSubscription?: Subscription
  eventDeleteSubscription?: Subscription
  getByEventIdSubscription?: Subscription
  getEventStatusSubscription?: Subscription

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true
  displayResponsive: boolean = false

  constructor(private title: Title, private router: Router, private store: Store, private eventService: EventService) {
    this.title.setTitle('Event List')
  }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent): void {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true

    this.getAllEventSubscription = this.eventService.getAll(startPage, maxPage, query).subscribe({
      next: result => {
        this.data = result.data
        this.loading = false
        this.totalRecords = result.total
      },
      error: _ => this.loading = false
    })
  }

  clear(table: Table): void {
    table.clear()
  }

  filter(text: any): void {
    this.data = this.data.filter(d => {
      return d.eventTitle?.includes(text) || d.categoryName?.toString().includes(text) || d.typeName?.toString().includes(text) || d.eventProvider?.toString().includes(text)
    })
  }

  onSubmit(id: string): void {
    this.router.navigateByUrl(`/admin/event/participant/${id}`)
  }

  onApprove(id: string): void {
    this.getByEventIdSubscription = this.eventService.getById(id).subscribe(result => {
      if (result) {
        this.update.id = id
        this.update.isActive = result.data.isActive
        this.update.version = result.data.version
        this.update.isApprove = true
        this.updateEventSubscription = this.eventService.update(this.update).subscribe(result => {
          if (result) {
            this.getData(0, 10)
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.getAllEventSubscription?.unsubscribe()
    this.eventDeleteSubscription?.unsubscribe()
    this.updateEventSubscription?.unsubscribe()
  }
}
