import { createReducer, on } from '@ngrx/store'

import { deleteRegencySuccessAction, insertRegencySuccessAction, loadRegencySuccessAction, updateRegencySuccessAction } from './regency.action'
import { GetAllRegencyDtoDataRes } from '../../dto/regency/get-all-regency-dto-data-res'

const getAllRegencyDtoDataRes: GetAllRegencyDtoDataRes[] = []

const initialState = {
    payload: getAllRegencyDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const regencyReducer = createReducer(
    initialState,
    on(loadRegencySuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateRegencySuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.regancyName = payload.regencyName
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteRegencySuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertRegencySuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)