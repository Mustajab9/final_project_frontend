import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllEventDtoDataRes } from 'projects/core/src/app/dto/event/get-all-event-dto-data-res';
import { UpdateEventDtoReq } from 'projects/core/src/app/dto/event/update-event-dto-req';
import { EventService } from 'projects/core/src/app/service/event.service';
import { deleteCategoryAction } from 'projects/core/src/app/state/category/category.action';
import { categorySelectorDelete } from 'projects/core/src/app/state/category/category.selector';
import { updateEventAction } from 'projects/core/src/app/state/event/event.action';
import { eventSelectorUpdate } from 'projects/core/src/app/state/event/event.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  i: number = 0
  data: GetAllEventDtoDataRes[] = []
  update: UpdateEventDtoReq = new UpdateEventDtoReq()

  updateEventSubscription?: Subscription
  getAllEventSubscription?: Subscription
  eventDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private eventService: EventService,
    private confirmationService: ConfirmationService) {
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
        this.data = result.data.filter(comp => comp.isApprove == false)
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

  // update(id: number): void {
  //   this.router.navigateByUrl(`/admin/category/${id}`)
  // }

  deleteProgress(): void {
    this.eventDeleteSubscription = this.store.select(categorySelectorDelete).subscribe(result => {
      if (result) {
        this.getData(0, 10)
      }
    })
  }

  deleteById(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteCategoryAction({ payload: id }))
        this.deleteProgress()
      }
    });
  }

  updateProgress(): void {
    this.updateEventSubscription = this.store.select(eventSelectorUpdate).subscribe(result => {
      if (result) {
        this.getData(0, 10)
      }
    })
  }

  onSubmit() {
    this.store.dispatch(updateEventAction({ payload: this.update }))
    this.updateProgress()
  }

  ngOnDestroy(): void {
    this.getAllEventSubscription?.unsubscribe
    this.eventDeleteSubscription?.unsubscribe
    this.updateEventSubscription?.unsubscribe
  }

}
