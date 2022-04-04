import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deletePaymentMethodAction, deletePaymentMethodSuccessAction, insertPaymentMethodAction, insertPaymentMethodSuccessAction, loadPaymentMethodAction, loadPaymentMethodSuccessAction, updatePaymentMethodAction, updatePaymentMethodSuccessAction } from './payment-method.action'
import { PaymentMethodService } from '../../service/payment-method.service'
import { UpdatePaymentMethodDtoReq } from '../../dto/payment-method/update-payment-method-dto-req'
import { GetByPaymentMethodIdDtoDataRes } from '../../dto/payment-method/get-by-payment-method-id-dto-data-res'

@Injectable()
export class PaymentMethodEffect {
    loadPaymentMethodEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadPaymentMethodAction),
            mergeMap(
                ({ payload }) => this.paymentMethodService.getAll(payload.query, payload.startPage, payload.maxPage).pipe(
                    map(result => loadPaymentMethodSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updatePaymentMethodEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updatePaymentMethodAction),
            mergeMap(
                ({ payload }) => this.paymentMethodService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdatePaymentMethodDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updatePaymentMethodSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deletePaymentMethodEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deletePaymentMethodAction),
            mergeMap(
                ({ payload }) => this.paymentMethodService.delete(payload).pipe(
                    map(result => deletePaymentMethodSuccessAction({ payload }))
                )
            )
        )
    )

    insertPaymentMethodEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertPaymentMethodAction),
            mergeMap(
                ({ payload }) => this.paymentMethodService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByPaymentMethodIdDtoDataRes = new GetByPaymentMethodIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.paymentCode = payload.paymentCode
                        newPayload.paymentName = payload.paymentName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertPaymentMethodSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private paymentMethodService: PaymentMethodService) { }
}