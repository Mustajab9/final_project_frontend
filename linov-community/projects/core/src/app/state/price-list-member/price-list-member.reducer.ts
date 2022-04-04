import { createReducer, on } from '@ngrx/store'

import { deletePriceListMemberSuccessAction, insertPriceListMemberSuccessAction, loadPriceListMemberSuccessAction, updatePriceListMemberSuccessAction } from './price-list-member.action'
import { GetAllPriceListMemberDtoDataRes } from '../../dto/price-list-member/get-all-price-list-member-dto-data-res'

const getAllPriceListMemberDtoDataRes: GetAllPriceListMemberDtoDataRes[] = []

const initialState = {
    payload: getAllPriceListMemberDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const priceListMemberReducer = createReducer(
    initialState,
    on(loadPriceListMemberSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updatePriceListMemberSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.priceNominal = payload.priceNominal
                newData.duration = payload.duration
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deletePriceListMemberSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertPriceListMemberSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)