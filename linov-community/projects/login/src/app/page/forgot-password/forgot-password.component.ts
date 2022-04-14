import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { UpdateUserDtoReq } from '../../../../../core/src/app/dto/user/update-user-dto-req'
import { UserService } from '../../../../../core/src/app/service/user.service'
import { LoadingService } from '../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  data: UpdateUserDtoReq = new UpdateUserDtoReq()
  filterTimeout: any
  isFound: boolean = false
  isLoading: boolean = false

  getUserByEmailSubscription?: Subscription
  forgotPasswordSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store,
    private userService: UserService, private loadingService: LoadingService) {
    this.title.setTitle("Forgot Password")
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => [
      this.isLoading = result
    ])
  }

  changeEmail() {
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout)
    }

    this.filterTimeout = setTimeout(() => {
      this.getUserByEmailSubscription = this.userService.getByEmail(this.data.email).subscribe(result => {
        if (result) {
          this.data.id = result.id
          this.data.roleId = result.roleId
          this.data.isActive = result.isActive
          this.data.version = result.version
          this.isFound = true
        } else {
          this.isFound = false
        }
      })
    }, 1000)
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.forgotPasswordSubscription = this.userService.forgotPassword(this.data).subscribe(result => {
        if (result) {
          this.router.navigateByUrl(`/login/member`)
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.getUserByEmailSubscription?.unsubscribe()
    this.forgotPasswordSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
