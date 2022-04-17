import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { Subscription, firstValueFrom } from 'rxjs'
import { Store } from '@ngrx/store'

import { ConfirmationService, LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllEventTypeDtoDataRes } from '../../../../../../core/src/app/dto/event-type/get-all-event-type-dto-data-res'
import { EventTypeService } from '../../../../../../core/src/app/service/event-type.service'
import { deleteEventTypeAction, loadEventTypeAction } from '../../../../../../core/src/app/state/event-type/event-type.action'
import { eventTypeSelectorDelete } from '../../../../../../core/src/app/state/event-type/event-type.selector'

@Component({
  selector: 'app-event-type-list',
  templateUrl: './event-type-list.component.html',
  styleUrls: ['./event-type-list.component.css']
})
export class EventTypeListComponent implements OnDestroy {

  data: GetAllEventTypeDtoDataRes[] = []

  eventTypeDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
    private eventTypeService: EventTypeService) {
    this.title.setTitle('Event Type List')
  }

  loadData(event: LazyLoadEvent): void {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): Promise<void> {
    this.loading = true
    try {
      const resultAllEvent = await firstValueFrom(this.eventTypeService.getAll(startPage, maxPage, query))
      this.data = resultAllEvent.data
      this.store.dispatch(loadEventTypeAction({payload: {startPage, maxPage, query}}))
      this.loading = false
      this.totalRecords = resultAllEvent.total
    }catch {
      this.loading = false
    }
  }

  clear(table: Table): void {
    table.clear()
  }

  filter(text: any): void {
    this.data = this.data.filter(d => {
      return d.typeCode?.includes(text) || d.typeName?.toString().includes(text)
    })
  }

  update(id: number): void {
    this.router.navigateByUrl(`/admin/event-type/${id}`)
  }

  deleteProgress(): void {
    this.eventTypeDeleteSubscription = this.store.select(eventTypeSelectorDelete).subscribe(result => {
      if (result) {
        this.getData(0, 10)
      }
    })
  }

  deleteById(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteEventTypeAction({ payload: id }))
        this.deleteProgress()
      }
    })
  }

  ngOnDestroy(): void {
    this.eventTypeDeleteSubscription?.unsubscribe()
  }

}
