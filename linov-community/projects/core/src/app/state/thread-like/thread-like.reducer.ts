import { createReducer, on } from '@ngrx/store'

import { deleteThreadLikeSuccessAction, insertThreadLikeSuccessAction, loadThreadLikeSuccessAction } from './thread-like.action'
import { GetAllThreadLikeDtoDataRes } from '../../dto/thread-like/get-all-thread-like-dto-data-res'

const getAllThreadLikeDtoDataRes: GetAllThreadLikeDtoDataRes[] = []

const initialState = {
    payload: getAllThreadLikeDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const threadLikeReducer = createReducer(
    initialState,
    on(loadThreadLikeSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(deleteThreadLikeSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertThreadLikeSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)