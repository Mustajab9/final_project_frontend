import { createAction, props } from '@ngrx/store'

import { UpdateCategoryDtoReq } from '../../dto/category/update-category-dto-req'
import { GetAllCategoryDtoDataRes } from '../../dto/category/get-all-category-dto-data-res'
import { InsertCategoryDtoReq } from '../../dto/category/insert-category-dto-req'
import { GetByCategoryIdDtoDataRes } from '../../dto/category/get-by-category-id-dto-data-res'

const loadCategoryAction = createAction(
    '[Category Page] load category',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadCategorySuccessAction = createAction(
    '[Category Page] load category success',
    props<{ payload: GetAllCategoryDtoDataRes[] }>()
)

const updateCategoryAction = createAction(
    '[Category Page] update category',
    props<{ payload: UpdateCategoryDtoReq }>()
)

const updateCategorySuccessAction = createAction(
    '[Category Page] update category success',
    props<{ payload: UpdateCategoryDtoReq }>()
)

const deleteCategoryAction = createAction(
    '[Category Page] delete category',
    props<{ payload: string }>()
)

const deleteCategorySuccessAction = createAction(
    '[Category Page] delete category success',
    props<{ payload: string }>()
)

const insertCategoryAction = createAction(
    '[Category Page] insert category',
    props<{ payload: InsertCategoryDtoReq }>()
)

const insertCategorySuccessAction = createAction(
    '[Category Page] insert category success',
    props<{ payload: GetByCategoryIdDtoDataRes }>()
)

export {
    loadCategoryAction, loadCategorySuccessAction, updateCategoryAction, updateCategorySuccessAction,
    deleteCategoryAction, deleteCategorySuccessAction, insertCategoryAction, insertCategorySuccessAction
}