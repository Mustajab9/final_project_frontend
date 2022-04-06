import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllPriceListEventDtoDataRes } from '../../dto/price-list-event/get-all-price-list-event-dto-data-res'

const priceListEventStore: string = 'priceListEventStore'

const priceListEventSelectorInit = createSelector(
    createFeatureSelector(priceListEventStore),
    (state: { init: boolean }) => state.init
)

const priceListEventSelectorAll = createSelector(
    createFeatureSelector(priceListEventStore),
    (state: { payload: GetAllPriceListEventDtoDataRes[] }) => state.payload
)

const priceListEventSelectorById = (id: string) => createSelector(
    createFeatureSelector(priceListEventStore),
    (state: { payload: GetAllPriceListEventDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const priceListEventSelectorUpdate = createSelector(
    createFeatureSelector(priceListEventStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const priceListEventSelectorInsert = createSelector(
    createFeatureSelector(priceListEventStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

const priceListEventSelectorDelete = createSelector(
    createFeatureSelector(priceListEventStore),
    (state: {deleteProgress: boolean}) => state.deleteProgress
)

export { priceListEventSelectorInit, priceListEventSelectorAll, priceListEventSelectorById, priceListEventSelectorUpdate, priceListEventSelectorInsert, priceListEventSelectorDelete }