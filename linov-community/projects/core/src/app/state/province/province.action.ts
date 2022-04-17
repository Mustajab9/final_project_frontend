import { createAction, props } from '@ngrx/store'

import { UpdateProvinceDtoReq } from '../../dto/province/update-province-dto-req'
import { GetAllProvinceDtoDataRes } from '../../dto/province/get-all-province-dto-data-res'
import { InsertProvinceDtoReq } from '../../dto/province/insert-province-dto-req'
import { GetByProvinceIdDtoDataRes } from '../../dto/province/get-by-province-id-dto-data-res'

const loadProvinceAction = createAction(
    '[Province Page] load province',
    props<{ payload: {startPage: number, maxPage: number, query: string | undefined} }>()
)

const loadProvinceSuccessAction = createAction(
    '[Province Page] load province success',
    props<{ payload: GetAllProvinceDtoDataRes[] }>()
)

const updateProvinceAction = createAction(
    '[Province Page] update province',
    props<{ payload: UpdateProvinceDtoReq }>()
)

const updateProvinceSuccessAction = createAction(
    '[Province Page] update province success',
    props<{ payload: UpdateProvinceDtoReq }>()
)

const deleteProvinceAction = createAction(
    '[Province Page] delete province',
    props<{ payload: string }>()
)

const deleteProvinceSuccessAction = createAction(
    '[Province Page] delete province success',
    props<{ payload: string }>()
)

const insertProvinceAction = createAction(
    '[Province Page] insert province',
    props<{ payload: InsertProvinceDtoReq }>()
)

const insertProvinceSuccessAction = createAction(
    '[Province Page] insert province success',
    props<{ payload: GetByProvinceIdDtoDataRes }>()
)

export {
    loadProvinceAction, loadProvinceSuccessAction, updateProvinceAction, updateProvinceSuccessAction,
    deleteProvinceAction, deleteProvinceSuccessAction, insertProvinceAction, insertProvinceSuccessAction
}