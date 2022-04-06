import { createReducer, on } from '@ngrx/store'

import { deletePollingChoiceSuccessAction, insertPollingChoiceSuccessAction, loadPollingChoiceSuccessAction, updatePollingChoiceSuccessAction } from './polling-choice.action'
import { GetAllPollingChoiceDtoDataRes } from '../../dto/polling-choice/get-all-polling-choice-dto-data-res'

const getAllPollingChoiceDtoDataRes: GetAllPollingChoiceDtoDataRes[] = []

const initialState = {
    payload: getAllPollingChoiceDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const pollingChoiceReducer = createReducer(
    initialState,
    on(loadPollingChoiceSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updatePollingChoiceSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.choiceName = payload.choiceName
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deletePollingChoiceSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertPollingChoiceSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)