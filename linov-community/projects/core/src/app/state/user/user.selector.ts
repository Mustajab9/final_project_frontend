import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllUserDtoDataRes } from '../../dto/user/get-all-user-dto-data-res'

const userStore: string = 'userStore'

const userSelectorInit = createSelector(
    createFeatureSelector(userStore),
    (state: { init: boolean }) => state.init
)

const userSelectorAll = createSelector(
    createFeatureSelector(userStore),
    (state: { payload: GetAllUserDtoDataRes[] }) => state.payload
)

const userSelectorById = (id: string) => createSelector(
    createFeatureSelector(userStore),
    (state: { payload: GetAllUserDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const userSelectorByEmail = (email: string) => createSelector(
    createFeatureSelector(userStore),
    (state: { payload: GetAllUserDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.username == email)
        return newData[0]
    }
)

const userSelectorUpdate = createSelector(
    createFeatureSelector(userStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const userSelectorInsert = createSelector(
    createFeatureSelector(userStore),
    (state: {insertProgress: boolean, payload: GetAllUserDtoDataRes[]}) => {
        return {
            insertProgres: state.insertProgress,
            payload: state.payload[state.payload.length - 1]
        }
    }
)

const userSelectorDelete = createSelector(
    createFeatureSelector(userStore),
    (state: {deleteProgress: boolean}) => state.deleteProgress
)

export { userSelectorInit, userSelectorAll, userSelectorById, userSelectorByEmail, userSelectorUpdate, userSelectorInsert, userSelectorDelete }