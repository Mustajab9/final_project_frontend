import { createReducer, on } from '@ngrx/store'

import { deletePriceListEventSuccessAction, insertPriceListEventSuccessAction, loadPriceListEventSuccessAction, updatePriceListEventSuccessAction } from './price-list-event.action'
import { GetAllPriceListEventDtoDataRes } from '../../dto/price-list-event/get-all-price-list-event-dto-data-res'

const getAllPriceListEventDtoDataRes: GetAllPriceListEventDtoDataRes[] = []

const initialState = {
    payload: getAllPriceListEventDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false,
    deleteProgress: false
}

export const priceListEventReducer = createReducer(
    initialState,
    on(loadPriceListEventSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updatePriceListEventSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.priceName = payload.priceName
                newData.priceNominal = payload.priceNominal
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deletePriceListEventSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, deleteProgress: true }
    }),
    on(insertPriceListEventSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)