import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { UpdateRoleDtoReq } from '../../../../../../core/src/app/dto/role/update-role-dto-req'
import { updateRoleAction } from '../../../../../../core/src/app/state/role/role.action'
import { roleSelectorById, roleSelectorUpdate } from '../../../../../../core/src/app/state/role/role.selector'

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.css']
})
export class RoleUpdateComponent implements OnInit, OnDestroy {

  data: UpdateRoleDtoReq = new UpdateRoleDtoReq()

  activatedRouteSubscription?: Subscription
  getByRoleIdSubscription?: Subscription
  updateRoleSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private store: Store) {
    this.title.setTitle('Update Role')
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByRoleIdSubscription = this.store.select(roleSelectorById(id)).subscribe(result => {
        this.data = { ...result }
      })
    })
  }

  updateProgress(): void {
    this.updateRoleSubscription = this.store.select(roleSelectorUpdate).subscribe(result => {
      if(result){
        this.router.navigateByUrl('/admin/role/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(updateRoleAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByRoleIdSubscription?.unsubscribe()
    this.updateRoleSubscription?.unsubscribe()
  }
}
