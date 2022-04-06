import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deletePaymentEventAction, deletePaymentEventSuccessAction, insertPaymentEventAction, insertPaymentEventSuccessAction, loadPaymentEventAction, loadPaymentEventSuccessAction, updatePaymentEventAction, updatePaymentEventSuccessAction } from './payment-event.action'
import { PaymentEventService } from '../../service/payment-event.service'
import { UpdatePaymentEventDtoReq } from '../../dto/payment-event/update-payment-event-dto-req'
import { GetByPaymentEventIdDtoDataRes } from '../../dto/payment-event/get-by-payment-event-id-dto-data-res'

@Injectable()
export class PaymentEventEffect {
    loadPaymentEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadPaymentEventAction),
            mergeMap(
                () => this.paymentEventService.getAll().pipe(
                    map(result => loadPaymentEventSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updatePaymentEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updatePaymentEventAction),
            mergeMap(
                ({ payload }) => this.paymentEventService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdatePaymentEventDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updatePaymentEventSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deletePaymentEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deletePaymentEventAction),
            mergeMap(
                ({ payload }) => this.paymentEventService.delete(payload).pipe(
                    map(result => deletePaymentEventSuccessAction({ payload }))
                )
            )
        )
    )

    insertPaymentEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertPaymentEventAction),
            mergeMap(
                ({ payload }) => this.paymentEventService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByPaymentEventIdDtoDataRes = new GetByPaymentEventIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.categoryCode = payload.categoryCode
                        newPayload.categoryName = payload.categoryName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertPaymentEventSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private paymentEventService: PaymentEventService) { }
}