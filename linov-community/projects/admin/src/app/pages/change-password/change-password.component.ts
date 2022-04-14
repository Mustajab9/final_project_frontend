import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { firstValueFrom } from 'rxjs'

import { UserService } from '../../../../../core/src/app/service/user.service'
import { LoginService } from '../../../../../core/src/app/service/login.service'
import { LoginDtoRes } from '../../../../../core/src/app/dto/user/login-dto-res'
import { ChangePasswordDtoReq } from '../../../../../core/src/app/dto/user/change-password-dto-req'
import { LoadingService } from '../../../../../core/src/app/service/loading.service'
import { GetByUserIdDtoRes } from '../../../../../core/src/app/dto/user/get-by-user-id-dto-res'
import { UpdateUserDtoRes } from '../../../../../core/src/app/dto/user/update-user-dto-res'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  data: ChangePasswordDtoReq = new ChangePasswordDtoReq()

  dataLogin: LoginDtoRes | null = this.loginService.getData()
  filterTimeout: any
  newPass!: string
  confirmationPass!: string
  isFound: boolean = false
  isLoading: boolean = false

  constructor(private title: Title, private userService: UserService,
    private loginService: LoginService, private loadingService: LoadingService) {
    this.title.setTitle("Change Password")
  }

  ngOnInit(): void {
    this.initData()
  }

  async initData(): Promise<void> {
    this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    const id: string | undefined = this.dataLogin?.data.id
    const result: GetByUserIdDtoRes = await firstValueFrom(this.userService.getById(id))
    if (result) {
      this.data.id = result.data?.id
      this.data.email = result.data.username
      this.data.roleId = result.data?.roleId
      this.data.isActive = result.data?.isActive
      this.data.version = result.data?.version
    }
  }

  changePassword(): void {
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout)
    }

    this.filterTimeout = setTimeout(() => {
      if (this.newPass == this.confirmationPass) {
        this.data.newPassword = this.newPass
        this.isFound = true
      } else {
        this.isFound = false
      }
    }, 1000)
  }

  async onSubmit(isValid: boolean): Promise<void> {
    if (isValid) {
      const result: UpdateUserDtoRes = await firstValueFrom(this.userService.changePassword(this.data))
      if (result) {
        this.initData()
      }
    }
  }
}
