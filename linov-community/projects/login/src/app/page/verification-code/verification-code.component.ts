import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'

import { GetByUserIdDtoDataRes } from '../../../../../core/src/app/dto/user/get-by-user-id-dto-data-res'
import { UpdateUserDtoReq } from '../../../../../core/src/app/dto/user/update-user-dto-req'
import { LoadingService } from '../../../../../core/src/app/service/loading.service'
import { UserService } from '../../../../../core/src/app/service/user.service'

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.css']
})
export class VerificationCodeComponent implements OnInit {

  data: UpdateUserDtoReq = new UpdateUserDtoReq()
  dataById: GetByUserIdDtoDataRes = new GetByUserIdDtoDataRes()
  verifCode?: string
  isLoading: boolean = false

  activatedRouteSubscription?: Subscription
  userGetByIdSubscription?: Subscription
  userUpdateSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private userService: UserService,
    private activatedRoute: ActivatedRoute, private loadingService: LoadingService) {
    this.title.setTitle("Verification Code")
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.dataById.id = id
    })
    this.userGetByIdSubscription = this.userService.getById(this.dataById.id).subscribe(result => {
      this.verifCode = result.data.verificationCode
      this.data.id = result.data.id
      this.data.email = result.data.username
      this.data.password = result.data.password
      this.data.roleId = result.data.roleId
      this.data.version = result.data.version

    })
  }

  onVerification(isValid: boolean) {
    if (isValid) {
      if (this.verifCode == this.dataById.verificationCode) {
        this.data.isActive = true
        this.userUpdateSubscription = this.userService.update(this.data).subscribe(result => {
          if (result) {
            this.router.navigateByUrl('/login/member')
          }
        })
      }

    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.userGetByIdSubscription?.unsubscribe()
    this.userUpdateSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }

}
