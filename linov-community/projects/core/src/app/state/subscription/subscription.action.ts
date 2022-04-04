import { createAction, props } from '@ngrx/store'

import { UpdateSubscriptionDtoReq } from '../../dto/subscription/update-subscription-dto-req'
import { GetAllSubscriptionDtoDataRes } from '../../dto/subscription/get-all-subscription-dto-data-res'
import { InsertSubscriptionDtoReq } from '../../dto/subscription/insert-subscription-dto-req'
import { GetBySubscriptionIdDtoDataRes } from '../../dto/subscription/get-by-subscription-id-dto-data-res'

const loadSubscriptionAction = createAction(
    '[Subscriptioon Page] load subscription',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadSubscriptionSuccessAction = createAction(
    '[Subscriptioon Page] load subscription success',
    props<{ payload: GetAllSubscriptionDtoDataRes[] }>()
)

const updateSubscriptionAction = createAction(
    '[Subscriptioon Page] update subscription',
    props<{ payload: UpdateSubscriptionDtoReq }>()
)

const updateSubscriptionSuccessAction = createAction(
    '[Subscriptioon Page] update subscription success',
    props<{ payload: UpdateSubscriptionDtoReq }>()
)

const deleteSubscriptionAction = createAction(
    '[Subscriptioon Page] delete subscription',
    props<{ payload: string }>()
)

const deleteSubscriptionSuccessAction = createAction(
    '[Subscriptioon Page] delete subscription success',
    props<{ payload: string }>()
)

const insertSubscriptionAction = createAction(
    '[Subscriptioon Page] insert subscription',
    props<{ payload: InsertSubscriptionDtoReq }>()
)

const insertSubscriptionSuccessAction = createAction(
    '[Subscriptioon Page] insert subscription success',
    props<{ payload: GetBySubscriptionIdDtoDataRes }>()
)

export {
    loadSubscriptionAction, loadSubscriptionSuccessAction, updateSubscriptionAction, updateSubscriptionSuccessAction,
    deleteSubscriptionAction, deleteSubscriptionSuccessAction, insertSubscriptionAction, insertSubscriptionSuccessAction
}