import { createReducer, on } from '@ngrx/store'

import { insertSubscriptionDetailSuccessAction, loadSubscriptionDetailSuccessAction } from './subscription-detail.action'
import { GetAllSubscriptionDetailDtoDataRes } from '../../dto/subscription-detail/get-all-subscription-detail-dto-data-res'

const getAllSubscriptionDetailDtoDataRes: GetAllSubscriptionDetailDtoDataRes[] = []

const initialState = {
    payload: getAllSubscriptionDetailDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const subscriptionDetailReducer = createReducer(
    initialState,
    on(loadSubscriptionDetailSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(insertSubscriptionDetailSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)