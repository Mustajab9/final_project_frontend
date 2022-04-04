import { createAction, props } from '@ngrx/store'

import { UpdateRegencyDtoReq } from '../../dto/regency/update-regency-dto-req'
import { GetAllRegencyDtoDataRes } from '../../dto/regency/get-all-regency-dto-data-res'
import { InsertRegencyDtoReq } from '../../dto/regency/insert-regency-dto-req'
import { GetByRegencyIdDtoDataRes } from '../../dto/regency/get-by-regency-id-dto-data-res'

const loadRegencyAction = createAction(
    '[Regency Page] load regency',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadRegencySuccessAction = createAction(
    '[Regency Page] load regency success',
    props<{ payload: GetAllRegencyDtoDataRes[] }>()
)

const updateRegencyAction = createAction(
    '[Regency Page] update regency',
    props<{ payload: UpdateRegencyDtoReq }>()
)

const updateRegencySuccessAction = createAction(
    '[Regency Page] update regency success',
    props<{ payload: UpdateRegencyDtoReq }>()
)

const deleteRegencyAction = createAction(
    '[Regency Page] delete regency',
    props<{ payload: string }>()
)

const deleteRegencySuccessAction = createAction(
    '[Regency Page] delete regency success',
    props<{ payload: string }>()
)

const insertRegencyAction = createAction(
    '[Regency Page] insert regency',
    props<{ payload: InsertRegencyDtoReq }>()
)

const insertRegencySuccessAction = createAction(
    '[Regency Page] insert regency success',
    props<{ payload: GetByRegencyIdDtoDataRes }>()
)

export {
    loadRegencyAction, loadRegencySuccessAction, updateRegencyAction, updateRegencySuccessAction,
    deleteRegencyAction, deleteRegencySuccessAction, insertRegencyAction, insertRegencySuccessAction
}