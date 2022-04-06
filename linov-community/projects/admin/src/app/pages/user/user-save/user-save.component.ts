import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InsertUserDtoReq } from '../../../../../../core/src/app/dto/user/insert-user-dto-req';
import { insertUserAction } from '../../../../../../core/src/app/state/user/user.action';
import { userSelectorInsert } from '../../../../../../core/src/app/state/user/user.selector';
import { Subscription } from 'rxjs';
import { GetAllRoleDtoDataRes } from 'projects/core/src/app/dto/role/get-all-role-dto-data-res';
import { RoleService } from 'projects/core/src/app/service/role.service';

@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.component.html',
  styleUrls: ['./user-save.component.css']
})
export class UserSaveComponent implements OnInit, OnDestroy {

  data: InsertUserDtoReq = new InsertUserDtoReq()
  roleData: GetAllRoleDtoDataRes[] = []

  roleGetAllSubscription?: Subscription
  userInsertSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store, private roleService: RoleService) {
    this.title.setTitle('Add User')
  }

  ngOnInit(): void {
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
  }
}
