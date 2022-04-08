import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { UpdateUserDtoReq } from '../../../../../core/src/app/dto/user/update-user-dto-req'
import { UserService } from '../../../../../core/src/app/service/user.service'
import { RoleService } from '../../../../../core/src/app/service/role.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  data: UpdateUserDtoReq = new UpdateUserDtoReq()

  filterTimeout : any
  newPass?: string
  confirmationPass?: string
  isFound: boolean = false
  getUserByEmailSubscription?: Subscription
  getRoleByIdSusbcription?: Subscription
  changePasswordSubscription?: Subscription

  constructor(private title: Title, private router: Router, private roleService: RoleService, private userService: UserService) {
    this.title.setTitle("Change Password")
  }

  ngOnInit(): void {
    this.getUserByEmailSubscription = this.userService.getByEmail(this.data.email).subscribe(result =>{
      if(result){
        this.data.id = result.id
        this.data.roleId = result.roleId
        this.data.isActive = result.isActive
        this.data.version = result.version
      }
    })
  }

  changeEmail(){
    if(this.filterTimeout) {
        clearTimeout(this.filterTimeout)
    }

    this.filterTimeout = setTimeout(() => {
    }, 1000)
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.changePasswordSubscription = this.userService.update(this.data).subscribe(result => {
        if(result){
          this.getRoleByIdSusbcription = this.roleService.getById(this.data.roleId).subscribe(result => {
            if(result.data?.roleCode == 'R01'){
              this.router.navigateByUrl(`admin/dashboard`)
            }else{
              this.router.navigateByUrl(`member/dashboard`)
            }
          })
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.getUserByEmailSubscription?.unsubscribe
    this.changePasswordSubscription?.unsubscribe
  }
}
