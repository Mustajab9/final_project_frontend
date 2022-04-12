import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { UserService } from '../../../../../core/src/app/service/user.service'
import { RoleService } from '../../../../../core/src/app/service/role.service'
import { LoginService } from '../../../../../core/src/app/service/login.service'
import { LoginDtoRes } from '../../../../../core/src/app/dto/user/login-dto-res'
import { ChangePasswordDtoReq } from '../../../../../core/src/app/dto/user/change-password-dto-req'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  data: ChangePasswordDtoReq = new ChangePasswordDtoReq()

  dataLogin: LoginDtoRes | null = this.loginService.getData()
  filterTimeout : any
  newPass!: string
  confirmationPass!: string
  isFound: boolean = false
  getUserByEmailSubscription?: Subscription
  changePasswordSubscription?: Subscription

  constructor(private title: Title, private router: Router, private userService: UserService, private loginService: LoginService) {
    this.title.setTitle("Change Password")
  }

  ngOnInit(): void {
    const id: string | undefined  = this.dataLogin?.data.id
    this.getUserByEmailSubscription = this.userService.getById(id).subscribe(result =>{
      if(result){
        this.data.id = result.data?.id
        this.data.email = result.data.username
        this.data.roleId = result.data?.roleId
        this.data.isActive = result.data?.isActive
        this.data.version = result.data?.version
      }
    })
  }

  changePassword(){
    if(this.filterTimeout) {
        clearTimeout(this.filterTimeout)
    }

    this.filterTimeout = setTimeout(() => {
      if(this.newPass == this.confirmationPass){
        this.data.newPassword = this.newPass
        this.isFound = true
      }else{
        this.isFound = false
      }
    }, 1000)
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      const roleCode: string | undefined = this.dataLogin?.data.roleCode
      this.changePasswordSubscription = this.userService.changePassword(this.data).subscribe(result => {
        if(result){
          if(roleCode == 'R01'){
            this.router.navigateByUrl(`admin/dashboard`)
          }else{
            this.router.navigateByUrl(`member/dashboard`)
          }
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.getUserByEmailSubscription?.unsubscribe
    this.changePasswordSubscription?.unsubscribe
  }
}