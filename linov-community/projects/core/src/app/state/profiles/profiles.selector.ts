import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllProfilesDtoDataRes } from '../../dto/profiles/get-all-profiles-dto-data-res'

const profilesStore: string = 'profilesStore'

const profilesSelectorInit = createSelector(
    createFeatureSelector(profilesStore),
    (state: { init: boolean }) => state.init
)

const profilesSelectorAll = createSelector(
    createFeatureSelector(profilesStore),
    (state: { payload: GetAllProfilesDtoDataRes[] }) => state.payload
)

const profilesSelectorById = (id: string) => createSelector(
    createFeatureSelector(profilesStore),
    (state: { payload: GetAllProfilesDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const profilesSelectorUpdate = createSelector(
    createFeatureSelector(profilesStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const profilesSelectorInsert = createSelector(
    createFeatureSelector(profilesStore),
    (state: {insertProgress: boolean, id: string}) => state.insertProgress
)

export {profilesSelectorInit, profilesSelectorAll, profilesSelectorById, profilesSelectorUpdate, profilesSelectorInsert }