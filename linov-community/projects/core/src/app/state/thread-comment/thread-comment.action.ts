import { createAction, props } from '@ngrx/store'

import { InsertThreadCommentDtoReq } from '../../dto/thread-comment/insert-thread-comment-dto-req'
import { GetByThreadCommentIdDtoDataRes } from '../../dto/thread-comment/get-by-thread-comment-id-dto-data-res'
import { GetAllThreadCommentDtoDataRes } from '../../dto/thread-comment/get-all-thread-comment-dto-data-res'

const loadThreadCommentAction = createAction(
    '[ThreadComment Page] load thread comment',
)

const loadThreadCommentSuccessAction = createAction(
    '[ThreadComment Page] load thread comment success',
    props<{ payload: GetAllThreadCommentDtoDataRes[] }>()
)

const deleteThreadCommentAction = createAction(
    '[ThreadComment Page] delete thread comment',
    props<{ payload: string }>()
)

const deleteThreadCommentSuccessAction = createAction(
    '[ThreadComment Page] delete thread comment success',
    props<{ payload: string }>()
)

const insertThreadCommentAction = createAction(
    '[ThreadComment Page] insert thread comment',
    props<{ payload: InsertThreadCommentDtoReq }>()
)

const insertThreadCommentSuccessAction = createAction(
    '[ThreadComment Page] insert thread comment success',
    props<{ payload: GetByThreadCommentIdDtoDataRes }>()
)

export {
    loadThreadCommentAction, loadThreadCommentSuccessAction,
    deleteThreadCommentAction, deleteThreadCommentSuccessAction, insertThreadCommentAction, insertThreadCommentSuccessAction
}