import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdatePriceListEventDtoReq } from '../../../../../../core/src/app/dto/price-list-event/update-price-list-event-dto-req';
import { updatePriceListEventAction } from '../../../../../../core/src/app/state/price-list-event/price-list-event.action';
import { priceListEventSelectorById, priceListEventSelectorUpdate } from '../../../../../../core/src/app/state/price-list-event/price-list-event.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-price-list-event-update',
  templateUrl: './price-list-event-update.component.html',
  styleUrls: ['./price-list-event-update.component.css']
})
export class PriceListEventUpdateComponent implements OnInit, OnDestroy {

  data: UpdatePriceListEventDtoReq = new UpdatePriceListEventDtoReq()

  activatedRouteSubscription?: Subscription
  getByPriceListEventIdSubscription?: Subscription
  updatePriceListEventSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private store: Store) {
    this.title.setTitle('Update Price Event List')
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByPriceListEventIdSubscription = this.store.select(priceListEventSelectorById(id)).subscribe(result => {
        this.data = { ...result }
      })
    })
  }

  updateProgress(): void {
    this.updatePriceListEventSubscription = this.store.select(priceListEventSelectorUpdate).subscribe(result => {
      if(result){
        this.router.navigateByUrl('/admin/price-list-event/list')
      }
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      this.store.dispatch(updatePriceListEventAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByPriceListEventIdSubscription?.unsubscribe()
    this.updatePriceListEventSubscription?.unsubscribe()
  }
}
