import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllThreadLikeDtoDataRes } from '../../dto/thread-like/get-all-thread-like-dto-data-res'

const threadLikeStore: string = 'threadLikeStore'

const threadLikeSelectorInit = createSelector(
    createFeatureSelector(threadLikeStore),
    (state: { init: boolean }) => state.init
)

const threadLikeSelectorAll = createSelector(
    createFeatureSelector(threadLikeStore),
    (state: { payload: GetAllThreadLikeDtoDataRes[] }) => state.payload
)

const threadLikeSelectorById = (id: string) => createSelector(
    createFeatureSelector(threadLikeStore),
    (state: { payload: GetAllThreadLikeDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)
const threadLikeSelectorInsert = createSelector(
    createFeatureSelector(threadLikeStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export { threadLikeSelectorInit, threadLikeSelectorAll, threadLikeSelectorById, threadLikeSelectorInsert }