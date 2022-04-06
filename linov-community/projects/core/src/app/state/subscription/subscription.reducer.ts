import { createReducer, on } from '@ngrx/store'

import { deleteSubscriptionSuccessAction, insertSubscriptionSuccessAction, loadSubscriptionSuccessAction, updateSubscriptionSuccessAction } from './subscription.action'
import { GetAllSubscriptionDtoDataRes } from '../../dto/subscription/get-all-subscription-dto-data-res'

const getAllSubscriptionDtoDataRes: GetAllSubscriptionDtoDataRes[] = []

const initialState = {
    payload: getAllSubscriptionDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false,
    deleteProgress: false
}

export const subscriptionReducer = createReducer(
    initialState,
    on(loadSubscriptionSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(updateSubscriptionSuccessAction, (state, { payload }) => {
        const newState = state.payload.map(comp => {
            let newData = { ...comp }
            if (comp.id == payload.id) {
                newData.isActive = payload.isActive
                newData.version = payload.version
            }
            return newData
        })

        return { ...state, payload: newState, updateProgress: true }
    }),
    on(deleteSubscriptionSuccessAction, (state, { payload }) => {
        const newData = state.payload.filter(comp => comp.id != payload)
        return { ...state, payload: newData, deleteProgress: true }
    }),
    on(insertSubscriptionSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)