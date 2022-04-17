import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { firstValueFrom, Subscription } from 'rxjs'

import { GetProfileByUserDtoDataRes } from '../../../../../core/src/app/dto/profiles/get-profile-by-user-dto-data-res'
import { EventService } from '../../../../../core/src/app/service/event.service'
import { LoginService } from '../../../../../core/src/app/service/login.service'
import { ProfilesService } from '../../../../../core/src/app/service/profiles.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  countries: any[] = []
  roleCode: string | undefined = this.loginService.getData()?.data.roleCode
  selectedCity1: any
  visibleSidebar1: any
  isLogin: boolean = this.loginService.isLogin()
  countNotPaid!: number

  profileByUser: GetProfileByUserDtoDataRes = new GetProfileByUserDtoDataRes()

  constructor(private eventService: EventService, private loginService: LoginService,
    private router: Router, private profileService: ProfilesService) { }

  async ngOnInit() {
    if(this.isLogin){
      const resultEventNotPaid = await firstValueFrom(this.eventService.getCountNotPaid())
      this.countNotPaid = resultEventNotPaid.countNotPaid

      const resultProfileByUser = await firstValueFrom(this.profileService.getByUserId())
      this.profileByUser = resultProfileByUser.data
    }
  }

  changePassword() {
    this.router.navigateByUrl('/member/change-password')
  }

  onClick(): void {
    this.loginService.clearData()
    this.router.navigateByUrl('/login/member')
  }

  onProfile(): void {

  }

}
