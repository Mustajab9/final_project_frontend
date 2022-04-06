import { createReducer, on } from '@ngrx/store'

import { deleteEventTypeSuccessAction, insertEventTypeSuccessAction, loadEventTypeSuccessAction, updateEventTypeSuccessAction } from './event-type.action'
import { GetAllEventTypeDtoDataRes } from '../../dto/event-type/get-all-event-type-dto-data-res'

const getAllEventTypeDtoDataRes: GetAllEventTypeDtoDataRes[] = []

const initialState = {
    payload: getAllEventTypeDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false,
    deleteProgress: false
}

export const eventTypeReducer = createReducer(
    initialState,
    on(loadEventTypeSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateEventTypeSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.typeName = payload.typeName
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteEventTypeSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, deleteProgress: true }
    }),
    on(insertEventTypeSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)