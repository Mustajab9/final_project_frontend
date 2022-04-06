import { createReducer, on } from '@ngrx/store'

import { deletePaymentEventSuccessAction, insertPaymentEventSuccessAction, loadPaymentEventSuccessAction, updatePaymentEventSuccessAction } from './payment-event.action'
import { GetAllPaymentEventDtoDataRes } from '../../dto/payment-event/get-all-payment-event-dto-data-res'

const getAllPaymentEventDtoDataRes: GetAllPaymentEventDtoDataRes[] = []

const initialState = {
    payload: getAllPaymentEventDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const paymentEventReducer = createReducer(
    initialState,
    on(loadPaymentEventSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updatePaymentEventSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.isApprove = payload.isApprove
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deletePaymentEventSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertPaymentEventSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)