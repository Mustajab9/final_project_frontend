import { createAction, props } from '@ngrx/store'

import { UpdatePaymentEventDtoReq } from '../../dto/payment-event/update-payment-event-dto-req'
import { GetAllPaymentEventDtoDataRes } from '../../dto/payment-event/get-all-payment-event-dto-data-res'
import { InsertPaymentEventDtoReq } from '../../dto/payment-event/insert-payment-event-dto-req'
import { GetByPaymentEventIdDtoDataRes } from '../../dto/payment-event/get-by-payment-event-id-dto-data-res'

const loadPaymentEventAction = createAction(
    '[PaymentEvent Page] load payment event'
)

const loadPaymentEventSuccessAction = createAction(
    '[PaymentEvent Page] load payment event success',
    props<{ payload: GetAllPaymentEventDtoDataRes[] }>()
)

const updatePaymentEventAction = createAction(
    '[PaymentEvent Page] update payment event',
    props<{ payload: UpdatePaymentEventDtoReq }>()
)

const updatePaymentEventSuccessAction = createAction(
    '[PaymentEvent Page] update payment event success',
    props<{ payload: UpdatePaymentEventDtoReq }>()
)

const deletePaymentEventAction = createAction(
    '[PaymentEvent Page] delete payment event',
    props<{ payload: string }>()
)

const deletePaymentEventSuccessAction = createAction(
    '[PaymentEvent Page] delete payment event success',
    props<{ payload: string }>()
)

const insertPaymentEventAction = createAction(
    '[PaymentEvent Page] insert payment event',
    props<{ payload: InsertPaymentEventDtoReq }>()
)

const insertPaymentEventSuccessAction = createAction(
    '[PaymentEvent Page] insert payment event success',
    props<{ payload: GetByPaymentEventIdDtoDataRes }>()
)

export {
    loadPaymentEventAction, loadPaymentEventSuccessAction, updatePaymentEventAction, updatePaymentEventSuccessAction,
    deletePaymentEventAction, deletePaymentEventSuccessAction, insertPaymentEventAction, insertPaymentEventSuccessAction
}