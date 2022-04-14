import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetAllCategoryDtoDataRes } from 'projects/core/src/app/dto/category/get-all-category-dto-data-res';
import { GetAllEventDtoDataRes } from 'projects/core/src/app/dto/event/get-all-event-dto-data-res';
import { GetEventByCategoryDtoDataRes } from 'projects/core/src/app/dto/event/get-event-by-category-dto-data-res';
import { CategoryService } from 'projects/core/src/app/service/category.service';
import { EventService } from 'projects/core/src/app/service/event.service';
import { LoadingService } from 'projects/core/src/app/service/loading.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

  data: GetAllEventDtoDataRes[] = []
  eventByCategory: GetEventByCategoryDtoDataRes[] = []
  categories: GetAllCategoryDtoDataRes[] = []
  userId?: string = this.loginService.getData()?.data.id
  isLogin: boolean = this.loginService.isLogin()

  getAllEventSubscription?: Subscription
  eventByCategorySubscription?: Subscription
  categoriesSubscription?: Subscription
  isLoading!: boolean

  constructor(private title: Title, private router: Router, private eventService: EventService,
    private loginService: LoginService, private categoryService: CategoryService,
    private loadingService: LoadingService) {
    this.title.setTitle('Course & Event List')
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    if (this.isLogin) {
      this.getAllEventSubscription = this.eventService.getAll().subscribe(result => {
        if (result) {
          this.data = result.data
        }
      })
    } else {
      this.getAllEventSubscription = this.eventService.getAllNl().subscribe(result => {
        if (result) {
          this.data = result.data
        }
      })
    }

    this.categoriesSubscription = this.categoryService.getAll().subscribe(result => {
      this.categories = result.data
    })
  }

  onEnroll(id: string) {
    this.router.navigateByUrl(`/member/event/${id}`)
  }

  onSubmit(id: string) {
    this.router.navigateByUrl(`/member/event/participant/event-all/${id}`)
  }

  onCategory(id: string) {
    if(this.isLogin){
      this.eventByCategorySubscription = this.eventService.getByCategory(id).subscribe(result => {
        this.data = result.data
      })
    }else{
      this.eventByCategorySubscription = this.eventService.getByCategoryNl(id).subscribe(result => {
        this.data = result.data
      })
    }
  }

  ngOnDestroy(): void {
    this.getAllEventSubscription?.unsubscribe()
    this.eventByCategorySubscription?.unsubscribe()
    this.categoriesSubscription?.unsubscribe()
  }

}