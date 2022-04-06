import { createAction, props } from '@ngrx/store'

import { GetAllSubscriptionDetailDtoDataRes } from '../../dto/subscription-detail/get-all-subscription-detail-dto-data-res'
import { InsertSubscriptionDetailDtoReq } from '../../dto/subscription-detail/insert-subscription-detail-dto-req'
import { GetBySubscriptionDetailIdDtoDataRes } from '../../dto/subscription-detail/get-by-subscription-detail-id-dto-data-res'

const loadSubscriptionDetailAction = createAction(
    '[SubscriptioonDetail Page] load subscription',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadSubscriptionDetailSuccessAction = createAction(
    '[SubscriptioonDetail Page] load subscription success',
    props<{ payload: GetAllSubscriptionDetailDtoDataRes[] }>()
)

const insertSubscriptionDetailAction = createAction(
    '[SubscriptioonDetail Page] insert subscription',
    props<{ payload: InsertSubscriptionDetailDtoReq }>()
)

const insertSubscriptionDetailSuccessAction = createAction(
    '[SubscriptioonDetail Page] insert subscription success',
    props<{ payload: GetBySubscriptionDetailIdDtoDataRes }>()
)

export {
    loadSubscriptionDetailAction, loadSubscriptionDetailSuccessAction, insertSubscriptionDetailAction, insertSubscriptionDetailSuccessAction
}