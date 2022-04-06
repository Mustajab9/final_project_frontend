import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { insertPaymentEventDetailAction, insertPaymentEventDetailSuccessAction, loadPaymentEventDetailAction, loadPaymentEventDetailSuccessAction } from './payment-event-detail.action'
import { PaymentEventDetailService } from '../../service/payment-event-detail.service'
import { GetByPaymentEventDetailIdDtoDataRes } from '../../dto/payment-event-detail/get-by-payment-event-detail-id-dto-data-res'

@Injectable()
export class PaymentEventDetailEffect {
    loadPaymentEventDetailffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadPaymentEventDetailAction),
            mergeMap(
                ({ payload }) => this.paymentEventDetailService.getAll(payload.query, payload.startPage, payload.maxPage).pipe(
                    map(result => loadPaymentEventDetailSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    insertPaymentEventDetailEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertPaymentEventDetailAction),
            mergeMap(
                ({ payload }) => this.paymentEventDetailService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByPaymentEventDetailIdDtoDataRes = new GetByPaymentEventDetailIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.categoryCode = payload.categoryCode
                        newPayload.categoryName = payload.categoryName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertPaymentEventDetailSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private paymentEventDetailService: PaymentEventDetailService) { }
}