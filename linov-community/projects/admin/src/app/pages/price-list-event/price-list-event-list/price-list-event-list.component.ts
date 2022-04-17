import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription, firstValueFrom } from 'rxjs'
import { Store } from '@ngrx/store'

import { ConfirmationService, LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllPriceListEventDtoDataRes } from '../../../../../../core/src/app/dto/price-list-event/get-all-price-list-event-dto-data-res'
import { PriceListEventService } from '../../../../../../core/src/app/service/price-list-event.service'
import { deletePriceListEventAction, loadPriceListEventAction } from '../../../../../../core/src/app/state/price-list-event/price-list-event.action'
import { priceListEventSelectorDelete } from '../../../../../../core/src/app/state/price-list-event/price-list-event.selector'

@Component({
  selector: 'app-price-list-event-list',
  templateUrl: './price-list-event-list.component.html',
  styleUrls: ['./price-list-event-list.component.css']
})
export class PriceListEventListComponent implements OnDestroy {

  data: GetAllPriceListEventDtoDataRes[] = []

  priceListEventDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
    private priceListEventService: PriceListEventService) {
    this.title.setTitle('Price List Event')
  }

  loadData(event: LazyLoadEvent): void {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): Promise<void> {
    this.loading = true

    try {
      const resultAll = await firstValueFrom(this.priceListEventService.getAll(startPage, maxPage, query))
      this.data = resultAll.data
      this.store.dispatch(loadPriceListEventAction({payload: {startPage, maxPage, query}}))
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
      return d.priceCode?.includes(text) || d.priceName?.toString().includes(text)
    })
  }

  update(id: number): void {
    this.router.navigateByUrl(`/admin/price-list-event/${id}`)
  }

  deleteProgress(): void {
    this.priceListEventDeleteSubscription = this.store.select(priceListEventSelectorDelete).subscribe(result => {
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
        this.store.dispatch(deletePriceListEventAction({ payload: id }))
        this.deleteProgress()
      }
    })
  }

  ngOnDestroy(): void {
    this.priceListEventDeleteSubscription?.unsubscribe()
  }
}
