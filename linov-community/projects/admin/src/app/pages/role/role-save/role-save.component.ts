import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { InsertRoleDtoReq } from '../../../../../../core/src/app/dto/role/insert-role-dto-req'
import { insertRoleAction } from '../../../../../../core/src/app/state/role/role.action'
import { roleSelectorInsert } from '../../../../../../core/src/app/state/role/role.selector'

@Component({
  selector: 'app-role-save',
  templateUrl: './role-save.component.html',
  styleUrls: ['./role-save.component.css']
})
export class RoleSaveComponent implements OnInit, OnDestroy {

  data: InsertRoleDtoReq = new InsertRoleDtoReq()
  roleInsertSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store) {
    this.title.setTitle('Add Role')
  }

  ngOnInit(): void {
  }

  insertProgress(): void {
    this.roleInsertSubscription = this.store.select(roleSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/role/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(insertRoleAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.roleInsertSubscription?.unsubscribe()
  }
}
