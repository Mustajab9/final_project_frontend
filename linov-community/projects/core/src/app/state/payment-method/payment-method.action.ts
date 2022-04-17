import { createAction, props } from '@ngrx/store'

import { UpdatePaymentMethodDtoReq } from '../../dto/payment-method/update-payment-method-dto-req'
import { GetAllPaymentMethodDtoDataRes } from '../../dto/payment-method/get-all-payment-method-dto-data-res'
import { InsertPaymentMethodDtoReq } from '../../dto/payment-method/insert-payment-method-dto-req'
import { GetByPaymentMethodIdDtoDataRes } from '../../dto/payment-method/get-by-payment-method-id-dto-data-res'

const loadPaymentMethodAction = createAction(
    '[PaymentMethod Page] load payment method',
    props<{ payload: {startPage: number, maxPage: number, query: string | undefined} }>()
)

const loadPaymentMethodSuccessAction = createAction(
    '[PaymentMethod Page] load payment method success',
    props<{ payload: GetAllPaymentMethodDtoDataRes[] }>()
)

const updatePaymentMethodAction = createAction(
    '[PaymentMethod Page] update payment method',
    props<{ payload: UpdatePaymentMethodDtoReq }>()
)

const updatePaymentMethodSuccessAction = createAction(
    '[PaymentMethod Page] update payment method success',
    props<{ payload: UpdatePaymentMethodDtoReq }>()
)

const deletePaymentMethodAction = createAction(
    '[PaymentMethod Page] delete payment method',
    props<{ payload: string }>()
)

const deletePaymentMethodSuccessAction = createAction(
    '[PaymentMethod Page] delete payment method success',
    props<{ payload: string }>()
)

const insertPaymentMethodAction = createAction(
    '[PaymentMethod Page] insert payment method',
    props<{ payload: InsertPaymentMethodDtoReq }>()
)

const insertPaymentMethodSuccessAction = createAction(
    '[PaymentMethod Page] insert payment method success',
    props<{ payload: GetByPaymentMethodIdDtoDataRes }>()
)

export {
    loadPaymentMethodAction, loadPaymentMethodSuccessAction, updatePaymentMethodAction, updatePaymentMethodSuccessAction,
    deletePaymentMethodAction, deletePaymentMethodSuccessAction, insertPaymentMethodAction, insertPaymentMethodSuccessAction
}