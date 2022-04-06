import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllThreadAttachmentDtoDataRes } from '../../dto/thread-attachment/get-all-thread-attachment-dto-data-res'

const threadAttachmentStore: string = 'threadAttachmentStore'

const threadAttachmentSelectorInit = createSelector(
    createFeatureSelector(threadAttachmentStore),
    (state: { init: boolean }) => state.init
)

const threadAttachmentSelectorAll = createSelector(
    createFeatureSelector(threadAttachmentStore),
    (state: { payload: GetAllThreadAttachmentDtoDataRes[] }) => state.payload
)

const threadAttachmentSelectorById = (id: string) => createSelector(
    createFeatureSelector(threadAttachmentStore),
    (state: { payload: GetAllThreadAttachmentDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const threadAttachmentSelectorInsert = createSelector(
    createFeatureSelector(threadAttachmentStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export { threadAttachmentSelectorInit, threadAttachmentSelectorAll, threadAttachmentSelectorById, threadAttachmentSelectorInsert }