import { createAction, props } from '@ngrx/store'

import { GetAllPollingDtoDataRes } from '../../dto/polling/get-all-polling-dto-data-res'
import { InsertPollingDtoReq } from '../../dto/polling/insert-polling-dto-req'
import { GetByPollingIdDtoDataRes } from '../../dto/polling/get-by-polling-id-dto-data-res'

const loadPollingAction = createAction(
    '[Polling Page] load polling'
)

const loadPollingSuccessAction = createAction(
    '[Polling Page] load polling success',
    props<{ payload: GetAllPollingDtoDataRes[] }>()
)

const deletePollingAction = createAction(
    '[Polling Page] delete polling',
    props<{ payload: string }>()
)

const deletePollingSuccessAction = createAction(
    '[Polling Page] delete polling success',
    props<{ payload: string }>()
)

const insertPollingAction = createAction(
    '[Polling Page] insert polling',
    props<{ payload: InsertPollingDtoReq }>()
)

const insertPollingSuccessAction = createAction(
    '[Polling Page] insert polling success',
    props<{ payload: GetByPollingIdDtoDataRes }>()
)

export {
    loadPollingAction, loadPollingSuccessAction,
    deletePollingAction, deletePollingSuccessAction, insertPollingAction, insertPollingSuccessAction
}