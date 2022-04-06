import { createReducer, on } from '@ngrx/store'

import { deleteThreadCommentSuccessAction, insertThreadCommentSuccessAction, loadThreadCommentSuccessAction } from './thread-comment.action'
import { GetAllThreadCommentDtoDataRes } from '../../dto/thread-comment/get-all-thread-comment-dto-data-res'

const getAllThreadCommentDtoDataRes: GetAllThreadCommentDtoDataRes[] = []

const initialState = {
    payload: getAllThreadCommentDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const threadCommentReducer = createReducer(
    initialState,
    on(loadThreadCommentSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(deleteThreadCommentSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertThreadCommentSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)