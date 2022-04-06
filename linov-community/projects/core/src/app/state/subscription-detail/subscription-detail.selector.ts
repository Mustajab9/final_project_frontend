import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllSubscriptionDetailDtoDataRes } from '../../dto/subscription-detail/get-all-subscription-detail-dto-data-res'

const subscriptionDetailStore: string = 'subscriptionDetailStore'

const subscriptionDetailSelectorInit = createSelector(
    createFeatureSelector(subscriptionDetailStore),
    (state: { init: boolean }) => state.init
)

const subscriptionDetailSelectorAll = createSelector(
    createFeatureSelector(subscriptionDetailStore),
    (state: { payload: GetAllSubscriptionDetailDtoDataRes[] }) => state.payload
)

const subscriptionDetailSelectorById = (id: string) => createSelector(
    createFeatureSelector(subscriptionDetailStore),
    (state: { payload: GetAllSubscriptionDetailDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const subscriptionDetailSelectorInsert = createSelector(
    createFeatureSelector(subscriptionDetailStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export { subscriptionDetailSelectorInit, subscriptionDetailSelectorAll, subscriptionDetailSelectorById, subscriptionDetailSelectorInsert }