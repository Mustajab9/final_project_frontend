import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { InsertUserDtoReq } from '../../../../../core/src/app/dto/user/insert-user-dto-req'
import { LoadingService } from '../../../../../core/src/app/service/loading.service'
import { insertUserAction } from '../../../../../core/src/app/state/user/user.action'
import { userSelectorInsert } from '../../../../../core/src/app/state/user/user.selector'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  data: InsertUserDtoReq = new InsertUserDtoReq()
  fullName?: string
  isLoading: boolean = false

  registerSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store, private loadingService: LoadingService) {
    this.title.setTitle("Sign Up")
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.data.roleCode = 'R03'
  }

  insertProgress(): void {
    this.registerSubscription = this.store.select(userSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl(`member/account-details/${this.fullName}/${result.payload.id}`)
      }
    })
  }

  onRegister(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertUserAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
