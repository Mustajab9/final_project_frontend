import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { firstValueFrom, Subscription } from 'rxjs'

import { GetAllCategoryDtoDataRes } from '../../../../../core/src/app/dto/category/get-all-category-dto-data-res'
import { GetAllEventDtoDataRes } from '../../../../../core/src/app/dto/event/get-all-event-dto-data-res'
import { GetAllEventDtoRes } from '../../../../../core/src/app/dto/event/get-all-event-dto-res'
import { GetEventByCategoryDtoDataRes } from '../../../../../core/src/app/dto/event/get-event-by-category-dto-data-res'
import { CategoryService } from '../../../../../core/src/app/service/category.service'
import { EventService } from '../../../../../core/src/app/service/event.service'
import { LoadingService } from '../../../../../core/src/app/service/loading.service'
import { LoginService } from '../../../../../core/src/app/service/login.service'

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  data: GetAllEventDtoDataRes[] = []
  eventByCategory: GetEventByCategoryDtoDataRes[] = []
  categories: GetAllCategoryDtoDataRes[] = []
  userId?: string = this.loginService.getData()?.data.id
  isLogin: boolean = this.loginService.isLogin()

  isLoading!: boolean

  constructor(private title: Title, private router: Router, private eventService: EventService,
    private loginService: LoginService, private categoryService: CategoryService,
    private loadingService: LoadingService) {
    this.title.setTitle('Course & Event List')
  }

  ngOnInit(): void {
    this.initData()
  }

  async initData(): Promise<void> {
    this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    let resultAllEvent: GetAllEventDtoRes
    if (this.isLogin) {
      resultAllEvent = await firstValueFrom(this.eventService.getAll())
    } else {
      resultAllEvent = await firstValueFrom(this.eventService.getAllNl())
    }

    if(resultAllEvent) {
      this.data = resultAllEvent.data
    }

    const resultAllCategory = await firstValueFrom(this.categoryService.getAll())
    this.categories = resultAllCategory.data
  }

  onEnroll(id: string) {
    this.router.navigateByUrl(`/member/event/${id}`)
  }

  onSubmit(id: string) {
    this.router.navigateByUrl(`/member/event/participant/event-all/${id}`)
  }

  async onCategory(id: string) {
    let resultAllCategory: GetAllEventDtoRes
    if(this.isLogin){
      resultAllCategory = await firstValueFrom(this.eventService.getByCategory(id))
    }else{
      resultAllCategory = await firstValueFrom(this.eventService.getByCategoryNl(id))
    }

    this.data = resultAllCategory.data
  }
}