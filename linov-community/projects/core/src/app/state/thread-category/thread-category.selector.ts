import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllThreadCategoryDtoDataRes } from '../../dto/thread-category/get-all-thread-category-dto-data-res'

const threadCategoryStore: string = 'threadCategoryStore'

const threadCategorySelectorInit = createSelector(
    createFeatureSelector(threadCategoryStore),
    (state: { init: boolean }) => state.init
)

const threadCategorySelectorAll = createSelector(
    createFeatureSelector(threadCategoryStore),
    (state: { payload: GetAllThreadCategoryDtoDataRes[] }) => state.payload
)

const threadCategorySelectorById = (id: string) => createSelector(
    createFeatureSelector(threadCategoryStore),
    (state: { payload: GetAllThreadCategoryDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)
const threadCategorySelectorInsert = createSelector(
    createFeatureSelector(threadCategoryStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export { threadCategorySelectorInit, threadCategorySelectorAll, threadCategorySelectorById, threadCategorySelectorInsert }