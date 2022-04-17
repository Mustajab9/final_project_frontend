import { createReducer, on } from '@ngrx/store'

import { deleteSocialMediaSuccessAction, insertSocialMediaSuccessAction, loadSocialMediaSuccessAction, updateSocialMediaSuccessAction } from './social-media.action'
import { GetAllSocialMediaDtoDataRes } from '../../dto/social-media/get-all-social-media-dto-data-res'

const getAllSocialMediaDtoDataRes: GetAllSocialMediaDtoDataRes[] = []

const initialState = {
    payload: getAllSocialMediaDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false,
    deleteProgress: false
}

export const socialMediaReducer = createReducer(
    initialState,
    on(loadSocialMediaSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateSocialMediaSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.socialMediaName = payload.socialMediaName
                newData.socialMediaIcon = payload.socialMediaIcon
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteSocialMediaSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, deleteProgress: true }
    }),
    on(insertSocialMediaSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)