import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { InsertPriceListEventDtoReq } from '../../../../../../core/src/app/dto/price-list-event/insert-price-list-event-dto-req'
import { insertPriceListEventAction } from '../../../../../../core/src/app/state/price-list-event/price-list-event.action'
import { priceListEventSelectorInsert } from '../../../../../../core/src/app/state/price-list-event/price-list-event.selector'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-price-list-event-save',
  templateUrl: './price-list-event-save.component.html',
  styleUrls: ['./price-list-event-save.component.css']
})
export class PriceListEventSaveComponent implements OnInit, OnDestroy {

  data: InsertPriceListEventDtoReq = new InsertPriceListEventDtoReq()
  isLoading: boolean = false

  priceListEventInsertSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store, private loadingService: LoadingService) {
    this.title.setTitle('Add Price Event List')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })
  }

  insertProgress(): void {
    this.priceListEventInsertSubscription = this.store.select(priceListEventSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/price-list-event/list')
      }
    })
  }

  onSubmit(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(insertPriceListEventAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.priceListEventInsertSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
