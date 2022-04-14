import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription, firstValueFrom } from 'rxjs'
import { Store } from '@ngrx/store'

import { ConfirmationService, LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllPriceListMemberDtoDataRes } from '../../../../../../core/src/app/dto/price-list-member/get-all-price-list-member-dto-data-res'
import { PriceListMemberService } from '../../../../../../core/src/app/service/price-list-member.service'
import { deletePriceListMemberAction } from '../../../../../../core/src/app/state/price-list-member/price-list-member.action'
import { priceListMemberSelectorDelete } from '../../../../../../core/src/app/state/price-list-member/price-list-member.selector'

@Component({
  selector: 'app-price-list-member-list',
  templateUrl: './price-list-member-list.component.html',
  styleUrls: ['./price-list-member-list.component.css']
})
export class PriceListMemberListComponent implements OnDestroy {

  data: GetAllPriceListMemberDtoDataRes[] = []

  priceListMemberDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
    private priceListMemberService: PriceListMemberService) {
    this.title.setTitle('Price List Member')
  }

  loadData(event: LazyLoadEvent): void {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): Promise<void> {
    this.loading = true

    try {
      const resultAll = await firstValueFrom(this.priceListMemberService.getAll(startPage, maxPage, query))
      this.data = resultAll.data
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
      return d.priceCode?.includes(text)
    })
  }

  update(id: number): void {
    this.router.navigateByUrl(`/admin/price-list-member/${id}`)
  }

  deleteProgress(): void {
    this.priceListMemberDeleteSubscription = this.store.select(priceListMemberSelectorDelete).subscribe(result => {
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
        this.store.dispatch(deletePriceListMemberAction({ payload: id }))
        this.deleteProgress()
      }
    })
  }

  ngOnDestroy(): void {
    this.priceListMemberDeleteSubscription?.unsubscribe()
  }

}
