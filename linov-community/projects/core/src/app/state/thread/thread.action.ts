import { createAction, props } from '@ngrx/store'

import { UpdateThreadDtoReq } from '../../dto/thread/update-thread-dto-req'
import { GetAllThreadDtoDataRes } from '../../dto/thread/get-all-thread-dto-data-res'
import { InsertThreadDtoReq } from '../../dto/thread/insert-thread-dto-req'
import { GetByThreadIdDtoDataRes } from '../../dto/thread/get-by-thread-id-dto-data-res'

const loadThreadAction = createAction(
    '[Thread Page] load thread '
)

const loadThreadSuccessAction = createAction(
    '[Thread Page] load thread  success',
    props<{ payload: GetAllThreadDtoDataRes[] }>()
)

const updateThreadAction = createAction(
    '[Thread Page] update thread',
    props<{ payload: UpdateThreadDtoReq }>()
)

const updateThreadSuccessAction = createAction(
    '[Thread Page] update thread success',
    props<{ payload: UpdateThreadDtoReq }>()
)

const deleteThreadAction = createAction(
    '[Thread Page] delete thread',
    props<{ payload: string }>()
)

const deleteThreadSuccessAction = createAction(
    '[Thread Page] delete thread success',
    props<{ payload: string }>()
)

const insertThreadAction = createAction(
    '[Thread Page] insert thread',
    props<{ payload: InsertThreadDtoReq }>()
)

const insertThreadSuccessAction = createAction(
    '[Thread Page] insert thread success',
    props<{ payload: GetByThreadIdDtoDataRes }>()
)

export {
    loadThreadAction, loadThreadSuccessAction, updateThreadAction, updateThreadSuccessAction,
    deleteThreadAction, deleteThreadSuccessAction, insertThreadAction, insertThreadSuccessAction
}