import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { firstValueFrom } from 'rxjs'
import { Store } from '@ngrx/store'

import { LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllEventDtoDataRes } from '../../../../../../core/src/app/dto/event/get-all-event-dto-data-res'
import { UpdateEventDtoReq } from '../../../../../../core/src/app/dto/event/update-event-dto-req'
import { EventService } from '../../../../../../core/src/app/service/event.service'
import { LoginService } from '../../../../../../core/src/app/service/login.service'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {

  data: GetAllEventDtoDataRes[] = []
  update: UpdateEventDtoReq = new UpdateEventDtoReq()
  userId?: string = this.loginService.getData()?.data.id
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store,
            private eventService: EventService, private loginService: LoginService) {
    this.title.setTitle('Event List')
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): Promise<void> {
    this.loading = true

    try {
      const resultAllEvent = await firstValueFrom(this.eventService.getAll(startPage, maxPage, query))
      this.data = resultAllEvent.data.filter(comp => comp.createdBy == this.userId)
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
      return d.eventTitle?.includes(text) || d.categoryName?.toString().includes(text) || d.typeName?.toString().includes(text) || d.eventProvider?.toString().includes(text)
    })
  }

  onSubmit(id: string) {
    this.router.navigateByUrl(`/member/event/participant/event-list/${id}`)
  }
}
