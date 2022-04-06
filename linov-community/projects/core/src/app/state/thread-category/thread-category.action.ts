import { createAction, props } from '@ngrx/store'

import { GetAllThreadCategoryDtoDataRes } from '../../dto/thread-category/get-all-thread-category-dto-data-res'
import { InsertThreadCategoryDtoReq } from '../../dto/thread-category/insert-thread-category-dto-req'
import { GetByThreadCategoryIdDtoDataRes } from '../../dto/thread-category/get-by-thread-category-id-dto-data-res'

const loadThreadCategoryAction = createAction(
    '[ThreadCategory Page] load thread category',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadThreadCategorySuccessAction = createAction(
    '[ThreadCategory Page] load thread category success',
    props<{ payload: GetAllThreadCategoryDtoDataRes[] }>()
)

const deleteThreadCategoryAction = createAction(
    '[ThreadCategory Page] delete thread category',
    props<{ payload: string }>()
)

const deleteThreadCategorySuccessAction = createAction(
    '[ThreadCategory Page] delete thread category success',
    props<{ payload: string }>()
)

const insertThreadCategoryAction = createAction(
    '[ThreadCategory Page] insert thread category',
    props<{ payload: InsertThreadCategoryDtoReq }>()
)

const insertThreadCategorySuccessAction = createAction(
    '[ThreadCategory Page] insert thread category success',
    props<{ payload: GetByThreadCategoryIdDtoDataRes }>()
)

export {
    loadThreadCategoryAction, loadThreadCategorySuccessAction,
    deleteThreadCategoryAction, deleteThreadCategorySuccessAction, insertThreadCategoryAction, insertThreadCategorySuccessAction
}