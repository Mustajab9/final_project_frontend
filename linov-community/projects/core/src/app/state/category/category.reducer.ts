import { createReducer, on } from '@ngrx/store'

import { deleteCategorySuccessAction, insertCategorySuccessAction, loadCategorySuccessAction, updateCategorySuccessAction } from './category.action'
import { GetAllCategoryDtoDataRes } from '../../dto/category/get-all-category-dto-data-res'

const getAllCategoryDtoDataRes: GetAllCategoryDtoDataRes[] = []

const initialState = {
    payload: getAllCategoryDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false,
    deleteProgress: false
}

export const categoryReducer = createReducer(
    initialState,
    on(loadCategorySuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateCategorySuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.categoryName = payload.categoryName
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteCategorySuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, deleteProgress: true }
    }),
    on(insertCategorySuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)