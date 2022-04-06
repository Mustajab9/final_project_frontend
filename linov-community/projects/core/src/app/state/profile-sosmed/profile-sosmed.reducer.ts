import { createReducer, on } from '@ngrx/store'

import { deleteProfileSosmedSuccessAction, insertProfileSosmedSuccessAction, loadProfileSosmedSuccessAction, updateProfileSosmedSuccessAction } from './profile-sosmed.action'
import { GetAllProfileSosmedDtoDataRes } from '../../dto/profile-sosmed/get-all-profile-sosmed-dto-data-res'

const getAllProfileSosmedDtoDataRes: GetAllProfileSosmedDtoDataRes[] = []

const initialState = {
    payload: getAllProfileSosmedDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const profileSosmedReducer = createReducer(
    initialState,
    on(loadProfileSosmedSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateProfileSosmedSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.accountName = payload.accountName
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteProfileSosmedSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertProfileSosmedSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)