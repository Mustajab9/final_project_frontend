import { createAction, props } from '@ngrx/store'

import { GetAllBookmarkDtoDataRes } from '../../dto/bookmark/get-all-bookmark-dto-data-res'
import { InsertBookmarkDtoReq } from '../../dto/bookmark/insert-bookmark-dto-req'
import { GetByBookmarkIdDtoDataRes } from '../../dto/bookmark/get-by-bookmark-id-dto-data-res'

const loadBookmarkAction = createAction(
    '[Bookmark Page] load bookmark'
)

const loadBookmarkSuccessAction = createAction(
    '[Bookmark Page] load bookmark success',
    props<{ payload: GetAllBookmarkDtoDataRes[] }>()
)

const deleteBookmarkAction = createAction(
    '[Bookmark Page] delete bookmark',
    props<{ payload: string }>()
)

const deleteBookmarkSuccessAction = createAction(
    '[Bookmark Page] delete bookmark success',
    props<{ payload: string }>()
)

const insertBookmarkAction = createAction(
    '[Bookmark Page] insert bookmark',
    props<{ payload: InsertBookmarkDtoReq }>()
)

const insertBookmarkSuccessAction = createAction(
    '[Bookmark Page] insert bookmark success',
    props<{ payload: GetByBookmarkIdDtoDataRes }>()
)

export {
    loadBookmarkAction, loadBookmarkSuccessAction,
    deleteBookmarkAction, deleteBookmarkSuccessAction, insertBookmarkAction, insertBookmarkSuccessAction
}