import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllSubscriptionDtoDataRes } from '../../dto/subscription/get-all-subscription-dto-data-res'

const subscriptionStore: string = 'subscriptionStore'

const subscriptionSelectorInit = createSelector(
    createFeatureSelector(subscriptionStore),
    (state: { init: boolean }) => state.init
)

const subscriptionSelectorAll = createSelector(
    createFeatureSelector(subscriptionStore),
    (state: { payload: GetAllSubscriptionDtoDataRes[] }) => state.payload
)

const subscriptionSelectorById = (id: string) => createSelector(
    createFeatureSelector(subscriptionStore),
    (state: { payload: GetAllSubscriptionDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const subscriptionSelectorUpdate = createSelector(
    createFeatureSelector(subscriptionStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const subscriptionSelectorInsert = createSelector(
    createFeatureSelector(subscriptionStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export { subscriptionSelectorInit, subscriptionSelectorAll, subscriptionSelectorById, subscriptionSelectorUpdate, subscriptionSelectorInsert }