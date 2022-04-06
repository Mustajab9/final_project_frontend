import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllProfileSosmedDtoDataRes } from '../../dto/profile-sosmed/get-all-profile-sosmed-dto-data-res'

const profileSosmedStore: string = 'profileSosmedStore'

const profileSosmedSelectorInit = createSelector(
    createFeatureSelector(profileSosmedStore),
    (state: { init: boolean }) => state.init
)

const profileSosmedSelectorAll = createSelector(
    createFeatureSelector(profileSosmedStore),
    (state: { payload: GetAllProfileSosmedDtoDataRes[] }) => state.payload
)

const profileSosmedSelectorById = (id: string) => createSelector(
    createFeatureSelector(profileSosmedStore),
    (state: { payload: GetAllProfileSosmedDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const profileSosmedSelectorUpdate = createSelector(
    createFeatureSelector(profileSosmedStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const profileSosmedSelectorInsert = createSelector(
    createFeatureSelector(profileSosmedStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export {profileSosmedSelectorInit, profileSosmedSelectorAll, profileSosmedSelectorById, profileSosmedSelectorUpdate, profileSosmedSelectorInsert }