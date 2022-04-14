import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetAllCategoryDtoDataRes } from 'projects/core/src/app/dto/category/get-all-category-dto-data-res';
import { GetAllEventTypeDtoDataRes } from 'projects/core/src/app/dto/event-type/get-all-event-type-dto-data-res';
import { InsertEventDtoReq } from 'projects/core/src/app/dto/event/insert-event-dto-req';
import { CategoryService } from 'projects/core/src/app/service/category.service';
import { EventTypeService } from 'projects/core/src/app/service/event-type.service';
import { EventService } from 'projects/core/src/app/service/event.service';
import { LoadingService } from 'projects/core/src/app/service/loading.service';
import { insertEventAction } from 'projects/core/src/app/state/event/event.action';
import { eventSelectorInsert } from 'projects/core/src/app/state/event/event.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-save',
  templateUrl: './event-save.component.html',
  styleUrls: ['./event-save.component.css']
})
export class EventSaveComponent implements OnInit, OnDestroy {

  data: InsertEventDtoReq = new InsertEventDtoReq()
  categoryData: GetAllCategoryDtoDataRes[] = []
  typeData: GetAllEventTypeDtoDataRes[] = []
  file?: File
  rangeDates: Date[] = []
  timeStart: Date = new Date()
  timeEnd: Date = new Date()
  isLoading: boolean = false

  insertEventSubscription?: Subscription
  getAllCategorySubscription?: Subscription
  getAllTypeSubscripton?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store, private datePipe: DatePipe,
    private categoryService: CategoryService, private typeService: EventTypeService,
    private eventService: EventService, private loadingService: LoadingService) {
    this.title.setTitle('Add Event')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.getAllCategorySubscription = this.categoryService.getAll().subscribe(result => {
      if (result) {
        this.categoryData = result.data
      }
    })

    this.getAllTypeSubscripton = this.typeService.getAll().subscribe(result => {
      if (result) {
        this.typeData = result.data
      }
    })
  }

  getDate() {
    let dateStart = this.datePipe.transform(this.rangeDates[0], 'y-MM-dd');
    let dateEnd = this.datePipe.transform(this.rangeDates[1], 'y-MM-dd');
    this.data.eventDateStart = dateStart
    this.data.eventDateEnd = dateEnd
  }

  getTimeStart() {
    let timeStart = this.datePipe.transform(this.timeStart, 'h:mm:ss');
    this.data.eventTimeStart = timeStart
  }

  getTimeEnd() {
    let timeEnd = this.datePipe.transform(this.timeEnd, 'h:mm:ss');
    this.data.eventTimeEnd = timeEnd
  }

  changeFile(event: any): void {
    this.file = event.target.files[0]
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.insertEventSubscription = this.eventService.insert(this.data, this.file).subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/member/course')
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.insertEventSubscription?.unsubscribe()
    this.getAllCategorySubscription?.unsubscribe()
    this.getAllTypeSubscripton?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
