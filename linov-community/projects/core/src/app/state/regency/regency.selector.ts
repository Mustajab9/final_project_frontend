import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllRegencyDtoDataRes } from '../../dto/regency/get-all-regency-dto-data-res'

const regencyStore: string = 'regencyStore'

const regencySelectorInit = createSelector(
    createFeatureSelector(regencyStore),
    (state: { init: boolean }) => state.init
)

const regencySelectorAll = createSelector(
    createFeatureSelector(regencyStore),
    (state: { payload: GetAllRegencyDtoDataRes[] }) => state.payload
)

const regencySelectorById = (id: string) => createSelector(
    createFeatureSelector(regencyStore),
    (state: { payload: GetAllRegencyDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const regencySelectorUpdate = createSelector(
    createFeatureSelector(regencyStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const regencySelectorInsert = createSelector(
    createFeatureSelector(regencyStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export { regencySelectorInit, regencySelectorAll, regencySelectorById, regencySelectorUpdate, regencySelectorInsert }