import { createReducer, on } from '@ngrx/store'

import { deleteThreadCategorySuccessAction, insertThreadCategorySuccessAction, loadThreadCategorySuccessAction } from './thread-category.action'
import { GetAllThreadCategoryDtoDataRes } from '../../dto/thread-category/get-all-thread-category-dto-data-res'

const getAllThreadCategoryDtoDataRes: GetAllThreadCategoryDtoDataRes[] = []

const initialState = {
    payload: getAllThreadCategoryDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const threadCategoryReducer = createReducer(
    initialState,
    on(loadThreadCategorySuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(deleteThreadCategorySuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertThreadCategorySuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)