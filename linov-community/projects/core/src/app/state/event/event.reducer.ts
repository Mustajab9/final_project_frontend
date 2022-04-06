import { createReducer, on } from '@ngrx/store'

import { deleteEventSuccessAction, insertEventSuccessAction, loadEventSuccessAction, updateEventSuccessAction } from './event.action'
import { GetAllEventDtoDataRes } from '../../dto/event/get-all-event-dto-data-res'

const getAllEventDtoDataRes: GetAllEventDtoDataRes[] = []

const initialState = {
    payload: getAllEventDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const eventReducer = createReducer(
    initialState,
    on(loadEventSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateEventSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.isApprove = payload.isApprove
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteEventSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertEventSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)