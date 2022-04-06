import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllProvinceDtoDataRes } from '../../dto/province/get-all-province-dto-data-res'

const provinceStore: string = 'provinceStore'

const provinceSelectorInit = createSelector(
    createFeatureSelector(provinceStore),
    (state: { init: boolean }) => state.init
)

const provinceSelectorAll = createSelector(
    createFeatureSelector(provinceStore),
    (state: { payload: GetAllProvinceDtoDataRes[] }) => state.payload
)

const provinceSelectorById = (id: string) => createSelector(
    createFeatureSelector(provinceStore),
    (state: { payload: GetAllProvinceDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const provinceSelectorUpdate = createSelector(
    createFeatureSelector(provinceStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const provinceSelectorInsert = createSelector(
    createFeatureSelector(provinceStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

const provinceSelectorDelete = createSelector(
    createFeatureSelector(provinceStore),
    (state: {deleteProgress: boolean}) => state.deleteProgress
)

export { provinceSelectorInit, provinceSelectorAll, provinceSelectorById, provinceSelectorUpdate, provinceSelectorInsert, provinceSelectorDelete }