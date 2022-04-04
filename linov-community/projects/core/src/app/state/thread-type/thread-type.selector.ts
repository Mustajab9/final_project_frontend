import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllThreadTypeDtoDataRes } from '../../dto/thread-type/get-all-thread-type-dto-data-res'

const threadTypeStore: string = 'threadTypeStore'

const threadTypeSelectorInit = createSelector(
    createFeatureSelector(threadTypeStore),
    (state: { init: boolean }) => state.init
)

const threadTypeSelectorAll = createSelector(
    createFeatureSelector(threadTypeStore),
    (state: { payload: GetAllThreadTypeDtoDataRes[] }) => state.payload
)

const threadTypeSelectorById = (id: string) => createSelector(
    createFeatureSelector(threadTypeStore),
    (state: { payload: GetAllThreadTypeDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const threadTypeSelectorUpdate = createSelector(
    createFeatureSelector(threadTypeStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const threadTypeSelectorInsert = createSelector(
    createFeatureSelector(threadTypeStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export { threadTypeSelectorInit,threadTypeSelectorAll, threadTypeSelectorById, threadTypeSelectorUpdate, threadTypeSelectorInsert }