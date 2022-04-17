import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription, firstValueFrom } from 'rxjs'
import { Store } from '@ngrx/store'

import { ConfirmationService, LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllRoleDtoDataRes } from '../../../../../../core/src/app/dto/role/get-all-role-dto-data-res'
import { RoleService } from '../../../../../../core/src/app/service/role.service'
import { deleteRoleAction, loadRoleAction } from '../../../../../../core/src/app/state/role/role.action'
import { roleSelectorDelete } from '../../../../../../core/src/app/state/role/role.selector'
import { GetAllRoleDtoRes } from 'projects/core/src/app/dto/role/get-all-role-dto-res'

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnDestroy {

  data: GetAllRoleDtoDataRes[] = []
  roleDeleteSubscription?: Subscription

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
              private roleService: RoleService) {
    this.title.setTitle('Role List')
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): Promise<void> {
    this.loading = true
    try {
      const result: GetAllRoleDtoRes = await firstValueFrom(this.roleService.getAll(startPage, maxPage, query))
      this.data = result.data
      this.store.dispatch(loadRoleAction({payload: {startPage, maxPage, query}}))
      this.loading = false
      this.totalRecords = result.total
    }catch {
      this.loading = false
    }
  }

  clear(table: Table): void {
    table.clear()
  }

  // filter(text: any): void {
  //   this.data = this.data.filter(d => {
  //     return d.roleCode?.includes(text) || d.roleName?.toString().includes(text)
  //   })
  // }

  update(id: number): void {
    this.router.navigateByUrl(`/admin/role/${id}`)
  }

  deleteProgress(): void {
    this.roleDeleteSubscription = this.store.select(roleSelectorDelete).subscribe(result => {
      if (result) {
        this.getData(0, 10)
      }
    })
  }

  deleteById(id: string){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.store.dispatch(deleteRoleAction({ payload: id }))
          this.deleteProgress()
      }
    })
  }

  ngOnDestroy(): void {
    this.roleDeleteSubscription?.unsubscribe()
  }

}
