import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllPaymentMethodDtoDataRes } from '../../dto/payment-method/get-all-payment-method-dto-data-res'

const paymentMethodStore: string = 'paymentMethodStore'

const paymentMethodSelectorInit = createSelector(
    createFeatureSelector(paymentMethodStore),
    (state: { init: boolean }) => state.init
)

const paymentMethodSelectorAll = createSelector(
    createFeatureSelector(paymentMethodStore),
    (state: { payload: GetAllPaymentMethodDtoDataRes[] }) => state.payload
)

const paymentMethodSelectorById = (id: string) => createSelector(
    createFeatureSelector(paymentMethodStore),
    (state: { payload: GetAllPaymentMethodDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const paymentMethodSelectorUpdate = createSelector(
    createFeatureSelector(paymentMethodStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const paymentMethodSelectorInsert = createSelector(
    createFeatureSelector(paymentMethodStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

const paymentMethodSelectorDelete = createSelector(
    createFeatureSelector(paymentMethodStore),
    (state: {deleteProgress: boolean}) => state.deleteProgress
)

export { paymentMethodSelectorInit, paymentMethodSelectorAll, paymentMethodSelectorById, paymentMethodSelectorUpdate, paymentMethodSelectorInsert, paymentMethodSelectorDelete }