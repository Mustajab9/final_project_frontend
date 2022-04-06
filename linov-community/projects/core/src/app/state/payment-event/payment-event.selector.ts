import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllPaymentEventDtoDataRes } from '../../dto/payment-event/get-all-payment-event-dto-data-res'

const paymentEventStore: string = 'paymentEventStore'

const paymentEventSelectorInit = createSelector(
    createFeatureSelector(paymentEventStore),
    (state: { init: boolean }) => state.init
)

const paymentEventSelectorAll = createSelector(
    createFeatureSelector(paymentEventStore),
    (state: { payload: GetAllPaymentEventDtoDataRes[] }) => state.payload
)

const paymentEventSelectorById = (id: string) => createSelector(
    createFeatureSelector(paymentEventStore),
    (state: { payload: GetAllPaymentEventDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const paymentEventSelectorUpdate = createSelector(
    createFeatureSelector(paymentEventStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const paymentEventSelectorInsert = createSelector(
    createFeatureSelector(paymentEventStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export {paymentEventSelectorInit, paymentEventSelectorAll, paymentEventSelectorById, paymentEventSelectorUpdate, paymentEventSelectorInsert }