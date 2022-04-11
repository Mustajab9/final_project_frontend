import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetAllCategoryDtoDataRes } from 'projects/core/src/app/dto/category/get-all-category-dto-data-res';
import { GetAllEventTypeDtoDataRes } from 'projects/core/src/app/dto/event-type/get-all-event-type-dto-data-res';
import { InsertEventDtoReq } from 'projects/core/src/app/dto/event/insert-event-dto-req';
import { CategoryService } from 'projects/core/src/app/service/category.service';
import { EventTypeService } from 'projects/core/src/app/service/event-type.service';
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

  insertEventSubscription?: Subscription
  getAllCategorySubscription?: Subscription
  getAllTypeSubscripton?: Subscription


  constructor(private title: Title, private router: Router, private store: Store,
              private categoryService: CategoryService, private typeService: EventTypeService) {
    this.title.setTitle('Add Event')
  }

  ngOnInit(): void {
    this.getAllCategorySubscription = this.categoryService.getAll().subscribe(result => {
      if(result){
        this.categoryData = result.data
      }
    })

    this.getAllTypeSubscripton = this.typeService.getAll().subscribe(result => {
      if(result){
        this.typeData = result.data
      }
    })
  }

  insertProgress(): void {
    this.insertEventSubscription = this.store.select(eventSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/member/course')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertEventAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.insertEventSubscription?.unsubscribe()
    this.getAllCategorySubscription?.unsubscribe()
    this.getAllTypeSubscripton?.unsubscribe()
  }
}
