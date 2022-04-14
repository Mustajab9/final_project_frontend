import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Store } from '@ngrx/store'
import { firstValueFrom } from 'rxjs'

import { LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllEventDtoDataRes } from '../../../../../../core/src/app/dto/event/get-all-event-dto-data-res'
import { GetByEventIdDtoDataRes } from '../../../../../../core/src/app/dto/event/get-by-event-id-dto-data-res'
import { UpdateEventDtoReq } from '../../../../../../core/src/app/dto/event/update-event-dto-req'
import { EventService } from '../../../../../../core/src/app/service/event.service'
import { GetAllEventDtoRes } from '../../../../../../core/src/app/dto/event/get-all-event-dto-res'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  data: GetAllEventDtoDataRes[] = []
  eventData: GetByEventIdDtoDataRes = new GetByEventIdDtoDataRes()
  update: UpdateEventDtoReq = new UpdateEventDtoReq()

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true
  displayResponsive: boolean = false
  isLoading: boolean = false

  constructor(private title: Title, private router: Router, private store: Store,
    private eventService: EventService, private loadingService: LoadingService) {
    this.title.setTitle('Event List')
  }

  ngOnInit(): void {
    this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })
  }

  loadData(event: LazyLoadEvent): void {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): Promise<void> {
    this.loading = true

    try {
      const result: GetAllEventDtoRes = await firstValueFrom(this.eventService.getAll(startPage, maxPage, query))
      this.data = result.data
      this.loading = false
      this.totalRecords = result.total
    } catch {
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

  onSubmit(id: string): void {
    this.router.navigateByUrl(`/admin/event/participant/${id}`)
  }

  async onApprove(id: string): Promise<void> {
    try {
      const result = await firstValueFrom(this.eventService.getById(id))
      if (result) {
        this.update.id = id
        this.update.isActive = result.data.isActive
        this.update.version = result.data.version
        this.update.isApprove = true

        const resultUpdate = await firstValueFrom(this.eventService.update(this.update))
        if (resultUpdate) {
          this.getData(0, 10)
        }
      }
    } catch { }
  }
}
