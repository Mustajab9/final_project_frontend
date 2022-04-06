import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllPositionDtoDataRes } from '../../dto/position/get-all-position-dto-data-res'

const positionStore: string = 'positionStore'

const positionSelectorInit = createSelector(
    createFeatureSelector(positionStore),
    (state: { init: boolean }) => state.init
)

const positionSelectorAll = createSelector(
    createFeatureSelector(positionStore),
    (state: { payload: GetAllPositionDtoDataRes[] }) => state.payload
)

const positionSelectorById = (id: string) => createSelector(
    createFeatureSelector(positionStore),
    (state: { payload: GetAllPositionDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const positionSelectorUpdate = createSelector(
    createFeatureSelector(positionStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const positionSelectorInsert = createSelector(
    createFeatureSelector(positionStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

const positionSelectorDelete = createSelector(
    createFeatureSelector(positionStore),
    (state: {deleteProgress: boolean}) => state.deleteProgress
)

export { positionSelectorInit, positionSelectorAll, positionSelectorById, positionSelectorUpdate, positionSelectorInsert, positionSelectorDelete }