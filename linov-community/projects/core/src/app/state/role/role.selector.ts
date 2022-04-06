import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllRoleDtoDataRes } from '../../dto/role/get-all-role-dto-data-res'

const roleStore: string = 'roleStore'

const roleSelectorInit = createSelector(
    createFeatureSelector(roleStore),
    (state: { init: boolean }) => state.init
)

const roleSelectorAll = createSelector(
    createFeatureSelector(roleStore),
    (state: { payload: GetAllRoleDtoDataRes[] }) => state.payload
)

const roleSelectorById = (id: string) => createSelector(
    createFeatureSelector(roleStore),
    (state: { payload: GetAllRoleDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const roleSelectorUpdate = createSelector(
    createFeatureSelector(roleStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const roleSelectorInsert = createSelector(
    createFeatureSelector(roleStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

const roleSelectorDelete = createSelector(
    createFeatureSelector(roleStore),
    (state: {deleteProgress: boolean}) => state.deleteProgress
)

export { roleSelectorInit, roleSelectorAll, roleSelectorById, roleSelectorUpdate, roleSelectorInsert, roleSelectorDelete }