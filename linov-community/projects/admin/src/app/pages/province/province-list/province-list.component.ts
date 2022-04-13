import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { ConfirmationService, LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllProvinceDtoDataRes } from '../../../../../../core/src/app/dto/province/get-all-province-dto-data-res'
import { ProvinceService } from '../../../../../../core/src/app/service/province.service'
import { deleteProvinceAction } from '../../../../../../core/src/app/state/province/province.action'
import { provinceSelectorDelete } from '../../../../../../core/src/app/state/province/province.selector'

@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.css']
})
export class ProvinceListComponent implements OnInit, OnDestroy {

  data: GetAllProvinceDtoDataRes[] = []

  getAllProvinceSubscription?: Subscription
  provinceDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
              private provinceService: ProvinceService) {
    this.title.setTitle('Province List')
  }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true

    this.getAllProvinceSubscription = this.provinceService.getAll(startPage, maxPage, query).subscribe({
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
      return d.provinceCode?.includes(text) || d.provinceName?.toString().includes(text)
    })
  }

  update(id: number): void {
    this.router.navigateByUrl(`/admin/province/${id}`)
  }

  deleteProgress(): void {
    this.provinceDeleteSubscription = this.store.select(provinceSelectorDelete).subscribe(result => {
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
          this.store.dispatch(deleteProvinceAction({ payload: id }))
          this.deleteProgress()
      }
    })
  }

  ngOnDestroy(): void {
    this.getAllProvinceSubscription?.unsubscribe()
    this.provinceDeleteSubscription?.unsubscribe()
  }

}
