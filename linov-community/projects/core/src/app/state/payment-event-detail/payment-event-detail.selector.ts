import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllPaymentEventDetailDtoDataRes } from '../../dto/payment-event-detail/get-all-payment-event-detail-dto-data-res'

const paymentEventDetailStore: string = 'paymentEventDetailStore'

const paymentEventDetailSelectorInit = createSelector(
    createFeatureSelector(paymentEventDetailStore),
    (state: { init: boolean }) => state.init
)

const paymentEventDetailSelectorAll = createSelector(
    createFeatureSelector(paymentEventDetailStore),
    (state: { payload: GetAllPaymentEventDetailDtoDataRes[] }) => state.payload
)

const paymentEventDetailSelectorById = (id: string) => createSelector(
    createFeatureSelector(paymentEventDetailStore),
    (state: { payload: GetAllPaymentEventDetailDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const paymentEventDetailSelectorUpdate = createSelector(
    createFeatureSelector(paymentEventDetailStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const paymentEventDetailSelectorInsert = createSelector(
    createFeatureSelector(paymentEventDetailStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export {paymentEventDetailSelectorInit, paymentEventDetailSelectorAll, paymentEventDetailSelectorById, paymentEventDetailSelectorUpdate, paymentEventDetailSelectorInsert }