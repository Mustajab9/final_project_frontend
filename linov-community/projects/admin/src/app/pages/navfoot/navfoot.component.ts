import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'

import { GetProfileByUserDtoDataRes } from '../../../../../core/src/app/dto/profiles/get-profile-by-user-dto-data-res'
import { LoginDtoDataRes } from '../../../../../core/src/app/dto/user/login-dto-data-res'
import { LoginService } from '../../../../../core/src/app/service/login.service'
import { ProfilesService } from '../../../../../core/src/app/service/profiles.service'

@Component({
  selector: 'app-navfoot',
  templateUrl: './navfoot.component.html',
  styleUrls: ['./navfoot.component.css']
})
export class NavfootComponent implements OnInit, OnDestroy {

  userProfile: GetProfileByUserDtoDataRes = new GetProfileByUserDtoDataRes()

  getProfileByUserSubscription?: Subscription

  constructor(private router: Router, private loginService: LoginService, private profilesService: ProfilesService) { }

  ngOnInit(): void {
    const data: LoginDtoDataRes | undefined = this.loginService.getData()?.data
    this.getProfileByUserSubscription = this.profilesService.getByUserId().subscribe(result => {
      if (result) {
        this.userProfile = result.data
      }
    })
  }

  changePassword(): void {
    this.router.navigateByUrl('/admin/change-password')
  }

  onLogOut(): void {
    this.loginService.clearData()
    this.router.navigateByUrl('/admin/login')
  }

  ngOnDestroy(): void {
    this.getProfileByUserSubscription?.unsubscribe()
  }

}
