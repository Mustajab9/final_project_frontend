import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { UpdateThreadTypeDtoReq } from '../../../../../../core/src/app/dto/thread-type/update-thread-type-dto-req'
import { updateThreadTypeAction } from '../../../../../../core/src/app/state/thread-type/thread-type.action'
import { threadTypeSelectorById, threadTypeSelectorUpdate } from '../../../../../../core/src/app/state/thread-type/thread-type.selector'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-thread-type-update',
  templateUrl: './thread-type-update.component.html',
  styleUrls: ['./thread-type-update.component.css']
})
export class ThreadTypeUpdateComponent implements OnInit, OnDestroy {

  data: UpdateThreadTypeDtoReq = new UpdateThreadTypeDtoReq()
  isLoading: boolean = false

  activatedRouteSubscription?: Subscription
  getByThreadTypeIdSubscription?: Subscription
  updateThreadTypeSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute,
    private store: Store, private loadingService: LoadingService) {
    this.title.setTitle('Update Thread Type')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByThreadTypeIdSubscription = this.store.select(threadTypeSelectorById(id)).subscribe(result => {
        this.data = { ...result }
      })
    })
  }

  updateProgress(): void {
    this.updateThreadTypeSubscription = this.store.select(threadTypeSelectorUpdate).subscribe(result => {
      if(result){
        this.router.navigateByUrl('/admin/thread-type/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(updateThreadTypeAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByThreadTypeIdSubscription?.unsubscribe()
    this.updateThreadTypeSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
