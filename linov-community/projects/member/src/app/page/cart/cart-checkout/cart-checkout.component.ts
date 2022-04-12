import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetAllEventDtoDataRes } from 'projects/core/src/app/dto/event/get-all-event-dto-data-res';
import { InsertPaymentEventDtoReq } from 'projects/core/src/app/dto/payment-event/insert-payment-event-dto-req';
import { GetAllPaymentMethodDtoDataRes } from 'projects/core/src/app/dto/payment-method/get-all-payment-method-dto-data-res';
import { CheckOutService } from 'projects/core/src/app/service/checkout.service';
import { PaymentEventService } from 'projects/core/src/app/service/payment-event.service';
import { PaymentMethodService } from 'projects/core/src/app/service/payment-method.service';
import { Subscription } from 'rxjs';

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
  getAllPaymentMethodSubscription?: Subscription
  insertPaymentEventSubscription?: Subscription

  constructor(private title: Title, private router: Router, private checkOutService: CheckOutService,
              private paymentMethodService: PaymentMethodService, private paymentEventService: PaymentEventService) {
  }

  ngOnInit(): void {
    this.data = this.checkOutService.getData()
    this.checkOutService.clearData()

    this.insertReq.eventId = []

    this.data?.forEach(result => {
      let eventId: string = result.id
      this.insertReq.eventId?.push(eventId)
    })

    this.getAllPaymentMethodSubscription = this.paymentMethodService.getAll().subscribe(result => {
      if(result){
        this.paymentData = result.data
      }
    })
  }

  changeFile(event: any): void {
    this.file = event.target.files[0]
  }

  onSubmit(isValid: boolean){
    if(isValid){
      this.insertPaymentEventSubscription = this.paymentEventService.insert(this.insertReq, this.file).subscribe(result => {
        if(result){
          this.router.navigateByUrl('/member/course')
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.getAllPaymentMethodSubscription?.unsubscribe()
    this.insertPaymentEventSubscription?.unsubscribe()
  }
}
