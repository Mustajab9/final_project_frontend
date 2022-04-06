import { createReducer, on } from '@ngrx/store'

import { deletePositionSuccessAction, insertPositionSuccessAction, loadPositionSuccessAction, updatePositionSuccessAction } from './position.action'
import { GetAllPositionDtoDataRes } from '../../dto/position/get-all-position-dto-data-res'

const getAllPositionDtoDataRes: GetAllPositionDtoDataRes[] = []

const initialState = {
    payload: getAllPositionDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false,
    deleteProgress: false
}

export const positionReducer = createReducer(
    initialState,
    on(loadPositionSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updatePositionSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.positionName = payload.positionName
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deletePositionSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, deleteProgress: true }
    }),
    on(insertPositionSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)