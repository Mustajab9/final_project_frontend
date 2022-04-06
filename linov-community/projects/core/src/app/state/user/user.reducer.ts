import { createReducer, on } from '@ngrx/store'

import { deleteUserSuccessAction, insertUserSuccessAction, loadUserSuccessAction, updateUserSuccessAction } from './user.action'
import { GetAllUserDtoDataRes } from '../../dto/user/get-all-user-dto-data-res'

const getAllUserDtoDataRes: GetAllUserDtoDataRes[] = []

const initialState = {
    payload: getAllUserDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false,
    deleteProgress: false
}

export const userReducer = createReducer(
    initialState,
    on(loadUserSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateUserSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.username = payload.email
                newData.password = payload.password
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteUserSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, deleteProgress: true }
    }),
    on(insertUserSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)