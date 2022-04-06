import { createReducer, on } from '@ngrx/store'

import { insertPaymentEventDetailSuccessAction, loadPaymentEventDetailSuccessAction } from './payment-event-detail.action'
import { GetAllPaymentEventDetailDtoDataRes } from '../../dto/payment-event-detail/get-all-payment-event-detail-dto-data-res'

const getAllPaymentEventDetailDtoDataRes: GetAllPaymentEventDetailDtoDataRes[] = []

const initialState = {
    payload: getAllPaymentEventDetailDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const paymentEventDetailReducer = createReducer(
    initialState,
    on(loadPaymentEventDetailSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(insertPaymentEventDetailSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)