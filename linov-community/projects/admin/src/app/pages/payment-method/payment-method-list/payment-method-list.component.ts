import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription, firstValueFrom } from 'rxjs'
import { Store } from '@ngrx/store'

import { ConfirmationService, LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'

import { GetAllPaymentMethodDtoDataRes } from '../../../../../../core/src/app/dto/payment-method/get-all-payment-method-dto-data-res'
import { PaymentMethodService } from '../../../../../../core/src/app/service/payment-method.service'
import { deletePaymentMethodAction } from '../../../../../../core/src/app/state/payment-method/payment-method.action'
import { paymentMethodSelectorDelete } from '../../../../../../core/src/app/state/payment-method/payment-method.selector'

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent implements OnDestroy {

  data: GetAllPaymentMethodDtoDataRes[] = []

  paymentMethodDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
    private paymentMethodService: PaymentMethodService) {
    this.title.setTitle('Payment Method List')
  }

  loadData(event: LazyLoadEvent): void {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): Promise<void> {
    this.loading = true

    try {
      const resultAll = await firstValueFrom(this.paymentMethodService.getAll(startPage, maxPage, query))
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
      return d.paymentCode?.includes(text) || d.paymentName?.toString().includes(text)
    })
  }

  update(id: number): void {
    this.router.navigateByUrl(`/admin/payment-method/${id}`)
  }

  deleteProgress(): void {
    this.paymentMethodDeleteSubscription = this.store.select(paymentMethodSelectorDelete).subscribe(result => {
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
        this.store.dispatch(deletePaymentMethodAction({ payload: id }))
        this.deleteProgress()
      }
    })
  }

  ngOnDestroy(): void {
    this.paymentMethodDeleteSubscription?.unsubscribe()
  }

}
