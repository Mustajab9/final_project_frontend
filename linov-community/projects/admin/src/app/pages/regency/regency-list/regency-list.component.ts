import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { firstValueFrom, Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { ConfirmationService, LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllRegencyDtoDataRes } from '../../../../../../core/src/app/dto/regency/get-all-regency-dto-data-res'
import { RegencyService } from '../../../../../../core/src/app/service/regency.service'
import { deleteRegencyAction, loadRegencyAction } from '../../../../../../core/src/app/state/regency/regency.action'
import { regencySelectorDelete } from '../../../../../../core/src/app/state/regency/regency.selector'

@Component({
  selector: 'app-regency-list',
  templateUrl: './regency-list.component.html',
  styleUrls: ['./regency-list.component.css']
})
export class RegencyListComponent implements OnDestroy {

  data: GetAllRegencyDtoDataRes[] = []

  regencyDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
    private regencyService: RegencyService) {
    this.title.setTitle('Regency List')
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): Promise<void> {
    this.loading = true

    try {
      const resultAll = await firstValueFrom(this.regencyService.getAll(startPage, maxPage, query))
      this.data = resultAll.data
      this.store.dispatch(loadRegencyAction({payload: {startPage, maxPage, query}}))
      this.loading = false
      this.totalRecords = resultAll.total
    }catch {
      this.loading = false
    }
  }

  clear(table: Table): void {
    table.clear()
  }

  filter(text: any): void {
    this.data = this.data.filter(d => {
      return d.regancyCode?.includes(text) || d.regancyName?.toString().includes(text) || d.provinceName?.toString().includes(text)
    })
  }

  update(id: number): void {
    this.router.navigateByUrl(`/admin/regency/${id}`)
  }

  deleteProgress(): void {
    this.regencyDeleteSubscription = this.store.select(regencySelectorDelete).subscribe(result => {
      if (result) {
        this.getData(0, 10)
      }
    })
  }

  deleteById(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteRegencyAction({ payload: id }))
        this.deleteProgress()
      }
    })
  }

  ngOnDestroy(): void {
    this.regencyDeleteSubscription?.unsubscribe()
  }

}
