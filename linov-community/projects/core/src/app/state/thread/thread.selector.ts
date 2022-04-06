import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllThreadDtoDataRes } from '../../dto/thread/get-all-thread-dto-data-res'

const threadStore: string = 'threadStore'

const threadSelectorInit = createSelector(
    createFeatureSelector(threadStore),
    (state: { init: boolean }) => state.init
)

const threadSelectorAll = createSelector(
    createFeatureSelector(threadStore),
    (state: { payload: GetAllThreadDtoDataRes[] }) => state.payload
)

const threadSelectorById = (id: string) => createSelector(
    createFeatureSelector(threadStore),
    (state: { payload: GetAllThreadDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const threadSelectorUpdate = createSelector(
    createFeatureSelector(threadStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const threadSelectorInsert = createSelector(
    createFeatureSelector(threadStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export { threadSelectorInit,threadSelectorAll, threadSelectorById, threadSelectorUpdate, threadSelectorInsert }