import { createReducer, on } from '@ngrx/store'

import { deleteThreadAttachmentSuccessAction, insertThreadAttachmentSuccessAction, loadThreadAttachmentSuccessAction } from './thread-attachment.action'
import { GetAllThreadAttachmentDtoDataRes } from '../../dto/thread-attachment/get-all-thread-attachment-dto-data-res'

const getAllThreadAttachmentDtoDataRes: GetAllThreadAttachmentDtoDataRes[] = []

const initialState = {
    payload: getAllThreadAttachmentDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const threadAttachmentReducer = createReducer(
    initialState,
    on(loadThreadAttachmentSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(deleteThreadAttachmentSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, init: true }
    }),
    on(insertThreadAttachmentSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)