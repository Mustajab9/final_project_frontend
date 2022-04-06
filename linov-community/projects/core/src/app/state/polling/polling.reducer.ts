import { createReducer, on } from '@ngrx/store'

import { deletePollingSuccessAction, insertPollingSuccessAction, loadPollingSuccessAction } from './polling.action'
import { GetAllPollingDtoDataRes } from '../../dto/polling/get-all-polling-dto-data-res'

const getAllPollingDtoDataRes: GetAllPollingDtoDataRes[] = []

const initialState = {
    payload: getAllPollingDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const pollingReducer = createReducer(
    initialState,
    on(loadPollingSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(deletePollingSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertPollingSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)