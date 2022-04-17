import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { firstValueFrom, Subscription } from 'rxjs'

import { GetAllEventDtoDataRes } from '../../../../../../core/src/app/dto/event/get-all-event-dto-data-res'
import { InsertPaymentEventDtoReq } from '../../../../../../core/src/app/dto/payment-event/insert-payment-event-dto-req'
import { GetAllPaymentMethodDtoDataRes } from '../../../../../../core/src/app/dto/payment-method/get-all-payment-method-dto-data-res'
import { CheckOutService } from '../../../../../../core/src/app/service/checkout.service'
import { LoadingService } from '../../../../../../core/src/app/service/loading.service'
import { PaymentEventService } from '../../../../../../core/src/app/service/payment-event.service'
import { PaymentMethodService } from '../../../../../../core/src/app/service/payment-method.service'

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit, OnDestroy {

  data: GetAllEventDtoDataRes[] | null = []
  insertReq: InsertPaymentEventDtoReq = new InsertPaymentEventDtoReq()
  paymentData: GetAllPaymentMethodDtoDataRes[] = []

  file?: File
  isLoading: boolean = false
  loadingServiceSubscription?: Subscription

  constructor(private title: Title, private router: Router, private checkOutService: CheckOutService,
    private paymentMethodService: PaymentMethodService, private paymentEventService: PaymentEventService,
    private loadingService: LoadingService) {
    this.title.setTitle('Cart Checkout')
  }

  async ngOnInit(): Promise<void> {
    this.loadingServiceSubscription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    this.data = this.checkOutService.getData()
    this.checkOutService.clearData()

    this.insertReq.eventId = []

    this.data?.forEach(result => {
      let eventId: string = result.id
      this.insertReq.eventId?.push(eventId)
    })

    const resultAllPayment = await firstValueFrom(this.paymentMethodService.getAll())
    if (resultAllPayment) {
      this.paymentData = resultAllPayment.data
    }
  }

  changeFile(event: any): void {
    this.file = event.target.files[0]
  }

  async onSubmit(isValid: boolean) {
    if (isValid) {
      const resultInsertPayment = await firstValueFrom(this.paymentEventService.insert(this.insertReq, this.file))
      if (resultInsertPayment) {
        this.router.navigateByUrl('/member/course')
      }
    }
  }

  ngOnDestroy(): void {
    this.loadingServiceSubscription?.unsubscribe()
  }
}
