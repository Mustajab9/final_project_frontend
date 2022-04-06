import { createAction, props } from '@ngrx/store'

import { UpdatePositionDtoReq } from '../../dto/position/update-position-dto-req'
import { GetAllPositionDtoDataRes } from '../../dto/position/get-all-position-dto-data-res'
import { InsertPositionDtoReq } from '../../dto/position/insert-position-dto-req'
import { GetByPositionIdDtoDataRes } from '../../dto/position/get-by-position-id-dto-data-res'

const loadPositionAction = createAction(
    '[Position Page] load position',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadPositionSuccessAction = createAction(
    '[Position Page] load position success',
    props<{ payload: GetAllPositionDtoDataRes[] }>()
)

const updatePositionAction = createAction(
    '[Position Page] update position',
    props<{ payload: UpdatePositionDtoReq }>()
)

const updatePositionSuccessAction = createAction(
    '[Position Page] update position success',
    props<{ payload: UpdatePositionDtoReq }>()
)

const deletePositionAction = createAction(
    '[Position Page] delete position',
    props<{ payload: string }>()
)

const deletePositionSuccessAction = createAction(
    '[Position Page] delete position success',
    props<{ payload: string }>()
)

const insertPositionAction = createAction(
    '[Position Page] insert position',
    props<{ payload: InsertPositionDtoReq }>()
)

const insertPositionSuccessAction = createAction(
    '[Position Page] insert position success',
    props<{ payload: GetByPositionIdDtoDataRes }>()
)

export {
    loadPositionAction, loadPositionSuccessAction, updatePositionAction, updatePositionSuccessAction,
    deletePositionAction, deletePositionSuccessAction, insertPositionAction, insertPositionSuccessAction
}