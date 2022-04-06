import { createReducer, on } from '@ngrx/store'

import { deleteEnrollEventSuccessAction, insertEnrollEventSuccessAction, loadEnrollEventSuccessAction, updateEnrollEventSuccessAction } from './enroll-event.action'
import { GetAllEnrollEventDtoDataRes } from '../../dto/enroll-event/get-all-enroll-event-dto-data-res'

const getAllEnrollEventDtoDataRes: GetAllEnrollEventDtoDataRes[] = []

const initialState = {
    payload: getAllEnrollEventDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const enrollEventReducer = createReducer(
    initialState,
    on(loadEnrollEventSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateEnrollEventSuccessAction, (state, { payload }) => {
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
    on(deleteEnrollEventSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertEnrollEventSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)