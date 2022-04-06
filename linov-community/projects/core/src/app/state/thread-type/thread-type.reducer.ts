import { createReducer, on } from '@ngrx/store'

import { deleteThreadTypeSuccessAction, insertThreadTypeSuccessAction, loadThreadTypeSuccessAction, updateThreadTypeSuccessAction } from './thread-type.action'
import { GetAllThreadTypeDtoDataRes } from '../../dto/thread-type/get-all-thread-type-dto-data-res'

const getAllThreadTypeDtoDataRes: GetAllThreadTypeDtoDataRes[] = []

const initialState = {
    payload: getAllThreadTypeDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false,
    deleteProgress: false
}

export const threadTypeReducer = createReducer(
    initialState,
    on(loadThreadTypeSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateThreadTypeSuccessAction, (state, { payload }) => {
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
    on(deleteThreadTypeSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, deleteProgress: true }
    }),
    on(insertThreadTypeSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)