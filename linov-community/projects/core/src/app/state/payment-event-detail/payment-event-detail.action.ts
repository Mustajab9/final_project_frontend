import { createAction, props } from '@ngrx/store'

import { GetAllPaymentEventDetailDtoDataRes } from '../../dto/payment-event-detail/get-all-payment-event-detail-dto-data-res'
import { InsertPaymentEventDetailDtoReq } from '../../dto/payment-event-detail/insert-payment-event-detail-dto-req'
import { GetByPaymentEventDetailIdDtoDataRes } from '../../dto/payment-event-detail/get-by-payment-event-detail-id-dto-data-res'

const loadPaymentEventDetailAction = createAction(
    '[PaymentEventDetail Page] load payment event detail'
)

const loadPaymentEventDetailSuccessAction = createAction(
    '[PaymentEventDetail Page] load payment event detail success',
    props<{ payload: GetAllPaymentEventDetailDtoDataRes[] }>()
)

const insertPaymentEventDetailAction = createAction(
    '[PaymentEventDetail Page] insert payment event detail',
    props<{ payload: InsertPaymentEventDetailDtoReq }>()
)

const insertPaymentEventDetailSuccessAction = createAction(
    '[PaymentEventDetail Page] insert payment event detail success',
    props<{ payload: GetByPaymentEventDetailIdDtoDataRes }>()
)

export {
    loadPaymentEventDetailAction, loadPaymentEventDetailSuccessAction, insertPaymentEventDetailAction, insertPaymentEventDetailSuccessAction
}