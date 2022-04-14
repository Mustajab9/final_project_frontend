
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { UpdateUserDtoReq } from '../../../../../../core/src/app/dto/user/update-user-dto-req'
import { updateUserAction } from '../../../../../../core/src/app/state/user/user.action'
import { userSelectorById, userSelectorUpdate } from '../../../../../../core/src/app/state/user/user.selector'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit, OnDestroy {

  data: UpdateUserDtoReq = new UpdateUserDtoReq()
  isLoading: boolean = false

  activatedRouteSubscription?: Subscription
  getByUserIdSubscription?: Subscription
  updateUserSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute,
    private store: Store, private loadingService: LoadingService) {
    this.title.setTitle('Update User')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByUserIdSubscription = this.store.select(userSelectorById(id)).subscribe(result => {
        this.data.id = result.id
        this.data.email = result.username
        this.data.password = result.password
        this.data.isActive = result.isActive
        this.data.version = result.version
        this.data.roleId = result.roleId
      })
    })
  }

  updateProgress(): void {
    this.updateUserSubscription = this.store.select(userSelectorUpdate).subscribe(result => {
      if(result){
        this.router.navigateByUrl('/admin/user/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(updateUserAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByUserIdSubscription?.unsubscribe()
    this.updateUserSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
