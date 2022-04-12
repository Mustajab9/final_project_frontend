import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllEventDtoDataRes } from 'projects/core/src/app/dto/event/get-all-event-dto-data-res';
import { UpdateEventDtoReq } from 'projects/core/src/app/dto/event/update-event-dto-req';
import { EventService } from 'projects/core/src/app/service/event.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {

  data: GetAllEventDtoDataRes[] = []
  update: UpdateEventDtoReq = new UpdateEventDtoReq()
  userId?: string = this.loginService.getData()?.data.id


  updateEventSubscription?: Subscription
  getAllEventSubscription?: Subscription
  eventDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store,
            private eventService: EventService, private loginService: LoginService) {
    this.title.setTitle('Event List')
  }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true;

    this.getAllEventSubscription = this.eventService.getAll(startPage, maxPage, query).subscribe({
      next: result => {
        this.data = result.data.filter(comp => comp.createdBy == this.userId)
        this.loading = false
        this.totalRecords = result.total
      },
      error: _ => this.loading = false
    })
  }

  clear(table: Table): void {
    table.clear();
  }

  filter(text: any): void {
    this.data = this.data.filter(d => {
      return d.eventTitle?.includes(text) || d.categoryName?.toString().includes(text)
    })
  }

  onSubmit(id: string) {
    this.router.navigateByUrl(`/member/event/participant/${id}`)
  }

  ngOnDestroy(): void {
    this.getAllEventSubscription?.unsubscribe()
    this.eventDeleteSubscription?.unsubscribe()
    this.updateEventSubscription?.unsubscribe()
  }
}
