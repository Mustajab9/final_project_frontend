import { DatePipe } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { firstValueFrom, Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { GetAllCategoryDtoDataRes } from '../../../../../../core/src/app/dto/category/get-all-category-dto-data-res'
import { GetAllEventTypeDtoDataRes } from '../../../../../../core/src/app/dto/event-type/get-all-event-type-dto-data-res'
import { InsertEventDtoReq } from '../../../../../../core/src/app/dto/event/insert-event-dto-req'
import { CategoryService } from '../../../../../../core/src/app/service/category.service'
import { EventTypeService } from '../../../../../../core/src/app/service/event-type.service'
import { EventService } from '../../../../../../core/src/app/service/event.service'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

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
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store, private datePipe: DatePipe,
    private categoryService: CategoryService, private typeService: EventTypeService,
    private eventService: EventService, private loadingService: LoadingService) {
    this.title.setTitle('Add Event')
  }

  async ngOnInit() {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    const resultAllCategory = await firstValueFrom(this.categoryService.getAll())
    if (resultAllCategory) {
      this.categoryData = resultAllCategory.data
    }

    const resultAllType = await firstValueFrom(this.typeService.getAll())
    if (resultAllType) {
      this.typeData = resultAllType.data
    }
  }

  getDate() {
    let dateStart = this.datePipe.transform(this.rangeDates[0], 'y-MM-dd')
    let dateEnd = this.datePipe.transform(this.rangeDates[1], 'y-MM-dd')
    this.data.eventDateStart = dateStart
    this.data.eventDateEnd = dateEnd
  }

  getTimeStart() {
    let timeStart = this.datePipe.transform(this.timeStart, 'h:mm:ss')
    this.data.eventTimeStart = timeStart
  }

  getTimeEnd() {
    let timeEnd = this.datePipe.transform(this.timeEnd, 'h:mm:ss')
    this.data.eventTimeEnd = timeEnd
  }

  changeFile(event: any): void {
    this.file = event.target.files[0]
  }

  async onSubmit(isValid: boolean) {
    if (isValid) {
      const resultInsert = await firstValueFrom(this.eventService.insert(this.data, this.file))
      if (resultInsert) {
        this.router.navigateByUrl('/member/course')
      }
    }
  }

  ngOnDestroy(): void {
    this.loadingServiceSubscription?.unsubscribe()
  }
}
