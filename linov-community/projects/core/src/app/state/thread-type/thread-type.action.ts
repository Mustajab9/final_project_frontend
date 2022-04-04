import { createAction, props } from '@ngrx/store'

import { UpdateThreadTypeDtoReq } from '../../dto/thread-type/update-thread-type-dto-req'
import { GetAllThreadTypeDtoDataRes } from '../../dto/thread-type/get-all-thread-type-dto-data-res'
import { InsertThreadTypeDtoReq } from '../../dto/thread-type/insert-thread-type-dto-req'
import { GetByThreadTypeIdDtoDataRes } from '../../dto/thread-type/get-by-thread-type-id-dto-data-res'

const loadThreadTypeAction = createAction(
    '[ThreadType Page] load thread type',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadThreadTypeSuccessAction = createAction(
    '[ThreadType Page] load thread type success',
    props<{ payload: GetAllThreadTypeDtoDataRes[] }>()
)

const updateThreadTypeAction = createAction(
    '[ThreadType Page] update thread type',
    props<{ payload: UpdateThreadTypeDtoReq }>()
)

const updateThreadTypeSuccessAction = createAction(
    '[ThreadType Page] update thread type success',
    props<{ payload: UpdateThreadTypeDtoReq }>()
)

const deleteThreadTypeAction = createAction(
    '[ThreadType Page] delete thread type',
    props<{ payload: string }>()
)

const deleteThreadTypeSuccessAction = createAction(
    '[ThreadType Page] delete thread type success',
    props<{ payload: string }>()
)

const insertThreadTypeAction = createAction(
    '[ThreadType Page] insert thread type',
    props<{ payload: InsertThreadTypeDtoReq }>()
)

const insertThreadTypeSuccessAction = createAction(
    '[ThreadType Page] insert thread type success',
    props<{ payload: GetByThreadTypeIdDtoDataRes }>()
)

export {
    loadThreadTypeAction, loadThreadTypeSuccessAction, updateThreadTypeAction, updateThreadTypeSuccessAction,
    deleteThreadTypeAction, deleteThreadTypeSuccessAction, insertThreadTypeAction, insertThreadTypeSuccessAction
}