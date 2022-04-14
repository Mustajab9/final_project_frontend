import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { UpdatePaymentMethodDtoReq } from '../../../../../../core/src/app/dto/payment-method/update-payment-method-dto-req'
import { updatePaymentMethodAction } from '../../../../../../core/src/app/state/payment-method/payment-method.action'
import { paymentMethodSelectorById, paymentMethodSelectorUpdate } from '../../../../../../core/src/app/state/payment-method/payment-method.selector'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'

@Component({
  selector: 'app-payment-method-update',
  templateUrl: './payment-method-update.component.html',
  styleUrls: ['./payment-method-update.component.css']
})
export class PaymentMethodUpdateComponent implements OnInit, OnDestroy {

  data: UpdatePaymentMethodDtoReq = new UpdatePaymentMethodDtoReq()
  isLoading: boolean = false

  activatedRouteSubscription?: Subscription
  getByPaymentMethodIdSubscription?: Subscription
  updatePaymentMethodSubscription?: Subscription
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute,
    private store: Store, private loadingService: LoadingService) {
    this.title.setTitle('Update Payment Method')
  }

  ngOnInit(): void {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByPaymentMethodIdSubscription = this.store.select(paymentMethodSelectorById(id)).subscribe(result => {
        this.data = { ...result }
      })
    })
  }

  updateProgress(): void {
    this.updatePaymentMethodSubscription = this.store.select(paymentMethodSelectorUpdate).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/payment-method/list')
      }
    })
  }

  onSubmit(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(updatePaymentMethodAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByPaymentMethodIdSubscription?.unsubscribe()
    this.updatePaymentMethodSubscription?.unsubscribe()
    this.loadingServiceSubscription?.unsubscribe()
  }
}
