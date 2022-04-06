import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllThreadCommentDtoDataRes } from '../../dto/thread-comment/get-all-thread-comment-dto-data-res'

const threadCommentStore: string = 'threadCommentStore'

const threadCommentSelectorInit = createSelector(
    createFeatureSelector(threadCommentStore),
    (state: { init: boolean }) => state.init
)

const threadCommentSelectorAll = createSelector(
    createFeatureSelector(threadCommentStore),
    (state: { payload: GetAllThreadCommentDtoDataRes[] }) => state.payload
)

const threadCommentSelectorById = (id: string) => createSelector(
    createFeatureSelector(threadCommentStore),
    (state: { payload: GetAllThreadCommentDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const threadCommentSelectorUpdate = createSelector(
    createFeatureSelector(threadCommentStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const threadCommentSelectorInsert = createSelector(
    createFeatureSelector(threadCommentStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export { threadCommentSelectorInit,threadCommentSelectorAll, threadCommentSelectorById, threadCommentSelectorUpdate, threadCommentSelectorInsert }