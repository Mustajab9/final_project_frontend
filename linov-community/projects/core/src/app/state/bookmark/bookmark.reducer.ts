import { createReducer, on } from '@ngrx/store'

import { deleteBookmarkSuccessAction, insertBookmarkSuccessAction, loadBookmarkSuccessAction } from './bookmark.action'
import { GetAllBookmarkDtoDataRes } from '../../dto/bookmark/get-all-bookmark-dto-data-res'

const getAllBookmarkDtoDataRes: GetAllBookmarkDtoDataRes[] = []

const initialState = {
    payload: getAllBookmarkDtoDataRes,
    init: false,
    insertProgress: false
}

export const bookmarkReducer = createReducer(
    initialState,
    on(loadBookmarkSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(deleteBookmarkSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertBookmarkSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)