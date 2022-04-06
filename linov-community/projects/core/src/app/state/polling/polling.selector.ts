import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllPollingDtoDataRes } from '../../dto/polling/get-all-polling-dto-data-res'

const pollingStore: string = 'pollingStore'

const pollingSelectorInit = createSelector(
    createFeatureSelector(pollingStore),
    (state: { init: boolean }) => state.init
)

const pollingSelectorAll = createSelector(
    createFeatureSelector(pollingStore),
    (state: { payload: GetAllPollingDtoDataRes[] }) => state.payload
)

const pollingSelectorById = (id: string) => createSelector(
    createFeatureSelector(pollingStore),
    (state: { payload: GetAllPollingDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const pollingSelectorInsert = createSelector(
    createFeatureSelector(pollingStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export {pollingSelectorInit, pollingSelectorAll, pollingSelectorById, pollingSelectorInsert }