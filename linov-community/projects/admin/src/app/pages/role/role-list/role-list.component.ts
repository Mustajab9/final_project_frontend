import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { ConfirmationService, LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllRoleDtoDataRes } from '../../../../../../core/src/app/dto/role/get-all-role-dto-data-res'
import { RoleService } from '../../../../../../core/src/app/service/role.service'
import { deleteRoleAction } from '../../../../../../core/src/app/state/role/role.action'
import { roleSelectorDelete } from '../../../../../../core/src/app/state/role/role.selector'

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit, OnDestroy {

  data: GetAllRoleDtoDataRes[] = []

  getAllRoleSubscription?: Subscription
  roleDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
              private roleService: RoleService) {
    this.title.setTitle('Role List')
  }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true

    this.getAllRoleSubscription = this.roleService.getAll(startPage, maxPage, query).subscribe({
      next: result => {
        this.data = result.data
        this.loading = false
        this.totalRecords = result.total
      },
      error: _ => this.loading = false
    })
  }

  clear(table: Table): void {
    table.clear()
  }

  filter(text: any): void {
    this.data = this.data.filter(d => {
      return d.roleCode?.includes(text) || d.roleName?.toString().includes(text)
    })
  }

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
    this.getAllRoleSubscription?.unsubscribe()
    this.roleDeleteSubscription?.unsubscribe()
  }

}
