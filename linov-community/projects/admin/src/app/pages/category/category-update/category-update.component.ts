import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'

import { updateCategoryAction } from '../../../../../../core/src/app/state/category/category.action'
import { categorySelectorById, categorySelectorUpdate } from '../../../../../../core/src/app/state/category/category.selector'
import { UpdateCategoryDtoReq } from '../../../../../../core/src/app/dto/category/update-category-dto-req'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit, OnDestroy {

  data: UpdateCategoryDtoReq = new UpdateCategoryDtoReq()
  isLoading: boolean = false

  activatedRouteSubscription?: Subscription
  getByCategoryIdSubscription?: Subscription
  updateCategorySubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute,
    private store: Store, private loadingService: LoadingService) {
    this.title.setTitle('Update Category')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByCategoryIdSubscription = this.store.select(categorySelectorById(id)).subscribe(result => {
        this.data = { ...result }
      })
    })
  }

  updateProgress(): void {
    this.updateCategorySubscription = this.store.select(categorySelectorUpdate).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/category/list')
      }
    })
  }

  onSubmit(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(updateCategoryAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByCategoryIdSubscription?.unsubscribe()
    this.updateCategorySubscription?.unsubscribe()
  }

}
