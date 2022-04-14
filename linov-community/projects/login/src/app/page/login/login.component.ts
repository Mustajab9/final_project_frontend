import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

import { LoadingService } from '../../../../../core/src/app/service/loading.service'
import { UserService } from '../../../../../core/src/app/service/user.service'
import { LoginDtoReq } from '../../../../../core/src/app/dto/user/login-dto-req'
import { LoginService } from '../../../../../core/src/app/service/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  login: LoginDtoReq = new LoginDtoReq()
  isLoading: boolean = false

  loginSubscription?: Subscription
  checkUserSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private loginService: LoginService,
    private userService: UserService, private loadingService: LoadingService) {
    this.title.setTitle('Login')
  }

  ngOnInit(): void {
  }

  onLogin(isValid: boolean) {
    if (isValid) {
      this.loginSubscription = this.loginService.login(this.login).subscribe(result => {
        this.loginService.saveData(result)
        this.checkUserSubscription = this.userService.getByEmail(this.login.username!).subscribe(resultCheck => {
          if (resultCheck.isActive != true) {
            this.router.navigateByUrl('/login/member')
          } else {
            if (result.data?.roleCode == 'R01') {
              this.router.navigateByUrl('admin/dashboard')
            } else if (result.data?.roleCode == 'R02' || result.data?.roleCode == 'R03') {
              this.router.navigateByUrl('member/dashboard')
            }
          }

        })

      })
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe()
    this.checkUserSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
