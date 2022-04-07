import { createReducer, on } from '@ngrx/store'

import { deleteProfilesSuccessAction, insertProfilesSuccessAction, loadProfilesSuccessAction, updateProfilesSuccessAction } from './profiles.action'
import { GetAllProfilesDtoDataRes } from '../../dto/profiles/get-all-profiles-dto-data-res'

const getAllProfilesDtoDataRes: GetAllProfilesDtoDataRes[] = []

const initialState = {
    payload: getAllProfilesDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const profilesReducer = createReducer(
    initialState,
    on(loadProfilesSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateProfilesSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.profileName = payload.profileName
                newData.profileCompany = payload.profileCompany
                newData.industryId = payload.industryId
                newData.positionId = payload.positionId
                newData.regencyId = payload.regencyId
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteProfilesSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertProfilesSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)