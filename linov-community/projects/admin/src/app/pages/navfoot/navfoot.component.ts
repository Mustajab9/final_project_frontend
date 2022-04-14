import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { firstValueFrom, Subscription } from 'rxjs'

import { GetProfileByUserDtoDataRes } from '../../../../../core/src/app/dto/profiles/get-profile-by-user-dto-data-res'
import { LoginDtoDataRes } from '../../../../../core/src/app/dto/user/login-dto-data-res'
import { LoginService } from '../../../../../core/src/app/service/login.service'
import { ProfilesService } from '../../../../../core/src/app/service/profiles.service'

@Component({
  selector: 'app-navfoot',
  templateUrl: './navfoot.component.html',
  styleUrls: ['./navfoot.component.css']
})
export class NavfootComponent implements OnInit {

  userProfile: GetProfileByUserDtoDataRes = new GetProfileByUserDtoDataRes()

  constructor(private router: Router, private loginService: LoginService, private profilesService: ProfilesService) { }

  async ngOnInit() {
    const resultProfileById = await firstValueFrom(this.profilesService.getByUserId())
    if (resultProfileById) {
      this.userProfile = resultProfileById.data
    }
  }

  changePassword(): void {
    this.router.navigateByUrl('/admin/change-password')
  }

  onLogOut(): void {
    this.loginService.clearData()
    this.router.navigateByUrl('/login/admin')
  }
}
