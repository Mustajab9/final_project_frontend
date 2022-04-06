import { createReducer, on } from '@ngrx/store'

import { deleteRoleSuccessAction, insertRoleSuccessAction, loadRoleSuccessAction, updateRoleSuccessAction } from './role.action'
import { GetAllRoleDtoDataRes } from '../../dto/role/get-all-role-dto-data-res'

const getAllRoleDtoDataRes: GetAllRoleDtoDataRes[] = []

const initialState = {
    payload: getAllRoleDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false,
    deleteProgress: false
}

export const roleReducer = createReducer(
    initialState,
    on(loadRoleSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateRoleSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.roleName = payload.roleName
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteRoleSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, deleteProgress: true }
    }),
    on(insertRoleSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)