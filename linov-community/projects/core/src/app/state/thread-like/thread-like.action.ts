import { createAction, props } from '@ngrx/store'

import { GetAllThreadLikeDtoDataRes } from '../../dto/thread-like/get-all-thread-like-dto-data-res'
import { InsertThreadLikeDtoReq } from '../../dto/thread-like/insert-thread-like-dto-req'
import { GetByThreadLikeIdDtoDataRes } from '../../dto/thread-like/get-by-thread-like-id-dto-data-res'

const loadThreadLikeAction = createAction(
    '[ThreadLike Page] load thread like',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadThreadLikeSuccessAction = createAction(
    '[ThreadLike Page] load thread like success',
    props<{ payload: GetAllThreadLikeDtoDataRes[] }>()
)

const deleteThreadLikeAction = createAction(
    '[ThreadLike Page] delete thread like',
    props<{ payload: string }>()
)

const deleteThreadLikeSuccessAction = createAction(
    '[ThreadLike Page] delete thread like success',
    props<{ payload: string }>()
)

const insertThreadLikeAction = createAction(
    '[ThreadLike Page] insert thread like',
    props<{ payload: InsertThreadLikeDtoReq }>()
)

const insertThreadLikeSuccessAction = createAction(
    '[ThreadLike Page] insert thread like success',
    props<{ payload: GetByThreadLikeIdDtoDataRes }>()
)

export {
    loadThreadLikeAction, loadThreadLikeSuccessAction,
    deleteThreadLikeAction, deleteThreadLikeSuccessAction, insertThreadLikeAction, insertThreadLikeSuccessAction
}