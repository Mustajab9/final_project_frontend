import { createReducer, on } from '@ngrx/store'

import { deleteThreadSuccessAction, insertThreadSuccessAction, loadThreadSuccessAction, updateThreadSuccessAction } from './thread.action'
import { GetAllThreadDtoDataRes } from '../../dto/thread/get-all-thread-dto-data-res'

const getAllThreadDtoDataRes: GetAllThreadDtoDataRes[] = []

const initialState = {
    payload: getAllThreadDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const threadReducer = createReducer(
    initialState,
    on(loadThreadSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateThreadSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.threadTitle = payload.threadTitle
                newData.threadContent = payload.threadContent
                newData.isPremium = payload.isPremium
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteThreadSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertThreadSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)