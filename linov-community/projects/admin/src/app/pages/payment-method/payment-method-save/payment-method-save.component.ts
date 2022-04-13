import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InsertPaymentMethodDtoReq } from '../../../../../../core/src/app/dto/payment-method/insert-payment-method-dto-req';
import { insertPaymentMethodAction } from '../../../../../../core/src/app/state/payment-method/payment-method.action';
import { paymentMethodSelectorInsert } from '../../../../../../core/src/app/state/payment-method/payment-method.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-method-save',
  templateUrl: './payment-method-save.component.html',
  styleUrls: ['./payment-method-save.component.css']
})
export class PaymentMethodSaveComponent implements OnInit, OnDestroy {

  data: InsertPaymentMethodDtoReq = new InsertPaymentMethodDtoReq()
  paymentMethodInsertSubscription?: Subscription

  constructor(private title: Title, private router: Router, private store: Store) {
    this.title.setTitle('Add Payment Method')
  }

  ngOnInit(): void {
  }

  insertProgress(): void {
    this.paymentMethodInsertSubscription = this.store.select(paymentMethodSelectorInsert).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/payment-method/list')
      }
    })
  }

  onSubmit(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(insertPaymentMethodAction({ payload: this.data }))
      this.insertProgress()
    }
  }

  ngOnDestroy(): void {
    this.paymentMethodInsertSubscription?.unsubscribe()
  }
}
