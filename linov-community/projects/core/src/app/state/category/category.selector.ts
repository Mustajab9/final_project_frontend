import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllCategoryDtoDataRes } from '../../dto/category/get-all-category-dto-data-res'

const categoryStore: string = 'categoryStore'

const categorySelectorInit = createSelector(
    createFeatureSelector(categoryStore),
    (state: { init: boolean }) => state.init
)

const categorySelectorAll = createSelector(
    createFeatureSelector(categoryStore),
    (state: { payload: GetAllCategoryDtoDataRes[] }) => state.payload
)

const categorySelectorById = (id: string) => createSelector(
    createFeatureSelector(categoryStore),
    (state: { payload: GetAllCategoryDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const categorySelectorUpdate = createSelector(
    createFeatureSelector(categoryStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const categorySelectorInsert = createSelector(
    createFeatureSelector(categoryStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export {categorySelectorInit, categorySelectorAll, categorySelectorById, categorySelectorUpdate, categorySelectorInsert }