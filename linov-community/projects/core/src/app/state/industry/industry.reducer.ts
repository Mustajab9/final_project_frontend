import { createReducer, on } from '@ngrx/store'

import { deleteIndustrySuccessAction, insertIndustrySuccessAction, loadIndustrySuccessAction, updateIndustrySuccessAction } from './industry.action'
import { GetAllIndustryDtoDataRes } from '../../dto/industry/get-all-industry-dto-data-res'

const getAllIndustryDtoDataRes: GetAllIndustryDtoDataRes[] = []

const initialState = {
    payload: getAllIndustryDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const industryReducer = createReducer(
    initialState,
    on(loadIndustrySuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateIndustrySuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.industryName = payload.industryName
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteIndustrySuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertIndustrySuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)