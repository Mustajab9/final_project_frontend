import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription, firstValueFrom } from 'rxjs'
import { Store } from '@ngrx/store'

import { ConfirmationService, LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllIndustryDtoDataRes } from '../../../../../../core/src/app/dto/industry/get-all-industry-dto-data-res'
import { IndustryService } from '../../../../../../core/src/app/service/industry.service'
import { deleteIndustryAction } from '../../../../../../core/src/app/state/industry/industry.action'
import { industrySelectorDelete } from '../../../../../../core/src/app/state/industry/industry.selector'

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.css']
})
export class IndustryListComponent implements OnDestroy {

  data: GetAllIndustryDtoDataRes[] = []

  industryDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store,
    private confirmationService: ConfirmationService, private industryService: IndustryService) {
    this.title.setTitle('Industry List')
  }

  loadData(event: LazyLoadEvent): void {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): Promise<void> {
    this.loading = true
    try {
      const resultAllIndustry = await firstValueFrom(this.industryService.getAll(startPage, maxPage, query))
      this.data = resultAllIndustry.data
      this.loading = false
      this.totalRecords = resultAllIndustry.total
    }catch {
      this.loading = false
    }
  }

  clear(table: Table): void {
    table.clear()
  }

  filter(text: any): void {
    this.data = this.data.filter(d => {
      return d.industryCode?.includes(text) || d.industryName?.toString().includes(text)
    })
  }

  update(id: number): void {
    this.router.navigateByUrl(`/admin/industry/${id}`)
  }

  deleteProgress(): void {
    this.industryDeleteSubscription = this.store.select(industrySelectorDelete).subscribe(result => {
      if (result) {
        this.getData(0, 10)
      }
    })
  }

  deleteById(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteIndustryAction({ payload: id }))
        this.deleteProgress()
      }
    })
  }

  ngOnDestroy(): void {
    this.industryDeleteSubscription?.unsubscribe()
  }

}
