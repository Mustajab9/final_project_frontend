import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetByUserIdDtoDataRes } from 'projects/core/src/app/dto/user/get-by-user-id-dto-data-res';
import { UpdateUserDtoReq } from 'projects/core/src/app/dto/user/update-user-dto-req';
import { UserService } from 'projects/core/src/app/service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.css']
})
export class VerificationCodeComponent implements OnInit {

  data: UpdateUserDtoReq = new UpdateUserDtoReq()
  dataById: GetByUserIdDtoDataRes = new GetByUserIdDtoDataRes()
  verifCode?: string
  activatedRouteSubscription?: Subscription
  userGetByIdSubscription?: Subscription
  userUpdateSubscription?: Subscription

  constructor(private title: Title, private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.title.setTitle("Verification Code")
  }

  ngOnInit(): void {
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

  // updateProgress(): void {
  //   this.registerSubscription = this.store.select(userSelectorUpdate).subscribe(result => {
  //     if (result) {
  //       this.router.navigateByUrl('/login')
  //     }
  //   })
  // }

  onVerification(isValid: boolean) {
    console.log(this.verifCode, this.dataById.verificationCode, isValid)
    if (isValid) {
      if (this.verifCode == this.dataById.verificationCode) {
        this.data.isActive = true
        // this.store.dispatch(updateUserAction({ payload: this.data }))
        // this.updateProgress()
        this.userUpdateSubscription = this.userService.update(this.data).subscribe(result => {
          if (result) {
            this.router.navigateByUrl('/login')
          }
        })
      }

    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe
    this.userGetByIdSubscription?.unsubscribe
    this.userUpdateSubscription?.unsubscribe
  }

}
