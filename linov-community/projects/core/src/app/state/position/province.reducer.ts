import { createReducer, on } from '@ngrx/store'

import { deleteProvinceSuccessAction, insertProvinceSuccessAction, loadProvinceSuccessAction, updateProvinceSuccessAction } from './province.action'
import { GetAllProvinceDtoDataRes } from '../../dto/province/get-all-province-dto-data-res'

const getAllProvinceDtoDataRes: GetAllProvinceDtoDataRes[] = []

const initialState = {
    payload: getAllProvinceDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const provinceReducer = createReducer(
    initialState,
    on(loadProvinceSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateProvinceSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.provinceName = payload.provinceName
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteProvinceSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertProvinceSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)