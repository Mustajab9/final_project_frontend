import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { InsertUserDtoReq } from '../../../../../../core/src/app/dto/user/insert-user-dto-req'
import { insertUserAction } from '../../../../../../core/src/app/state/user/user.action'
import { userSelectorInsert } from '../../../../../../core/src/app/state/user/user.selector'
import { GetAllRoleDtoDataRes } from '../../../../../../core/src/app/dto/role/get-all-role-dto-data-res'
import { RoleService } from '../../../../../../core/src/app/service/role.service'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.component.html',
  styleUrls: ['./user-save.component.css']
})
export class UserSaveComponent implements OnInit, OnDestroy {

  roleData: GetAllRoleDtoDataRes[] = []
  data: InsertUserDtoReq = new InsertUserDtoReq()
  isLoading: boolean = false

  roleGetAllSubscription?: Subscription
  userInsertSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store,
    private roleService: RoleService, private loadingService: LoadingService) {
    this.title.setTitle('Add User')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.roleGetAllSubscription = this.roleService.getAll(0, 10).subscribe(result => {
      if(result){
        this.roleData = result.data
      }
    })
  }

  insertProgress(): void {
    this.userInsertSubscription = this.store.select(userSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/user/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertUserAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.userInsertSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
