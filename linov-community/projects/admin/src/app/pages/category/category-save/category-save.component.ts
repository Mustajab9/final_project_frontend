import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'

import { InsertCategoryDtoReq } from '../../../../../../core/src/app/dto/category/insert-category-dto-req'
import { insertCategoryAction } from '../../../../../../core/src/app/state/category/category.action'
import { categorySelectorInsert } from '../../../../../../core/src/app/state/category/category.selector'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-category-save',
  templateUrl: './category-save.component.html',
  styleUrls: ['./category-save.component.css']
})
export class CategorySaveComponent implements OnInit, OnDestroy {

  data: InsertCategoryDtoReq = new InsertCategoryDtoReq()
  isLoading: boolean = false

  categoryInsertSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store, private loadingService: LoadingService) {
    this.title.setTitle('Add Category')
  }

  ngOnInit(): void {
  }

  insertProgress(): void {
    this.categoryInsertSubscription = this.store.select(categorySelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/category/list')
      }
    })
  }

  onSubmit(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(insertCategoryAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.categoryInsertSubscription?.unsubscribe()
  }
}
