import { createReducer, on } from '@ngrx/store'

import { deletePaymentMethodSuccessAction, insertPaymentMethodSuccessAction, loadPaymentMethodSuccessAction, updatePaymentMethodSuccessAction } from './payment-method.action'
import { GetAllPaymentMethodDtoDataRes } from '../../dto/payment-method/get-all-payment-method-dto-data-res'

const getAllPaymentMethodDtoDataRes: GetAllPaymentMethodDtoDataRes[] = []

const initialState = {
    payload: getAllPaymentMethodDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const paymentMethodReducer = createReducer(
    initialState,
    on(loadPaymentMethodSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updatePaymentMethodSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.paymentName = payload.paymentName
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deletePaymentMethodSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertPaymentMethodSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)