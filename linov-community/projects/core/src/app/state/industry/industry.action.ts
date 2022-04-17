import { createAction, props } from '@ngrx/store'

import { UpdateIndustryDtoReq } from '../../dto/industry/update-industry-dto-req'
import { GetAllIndustryDtoDataRes } from '../../dto/industry/get-all-industry-dto-data-res'
import { InsertIndustryDtoReq } from '../../dto/industry/insert-industry-dto-req'
import { GetByIndustryIdDtoDataRes } from '../../dto/industry/get-by-industry-id-dto-data-res'

const loadIndustryAction = createAction(
    '[Industry Page] load industry',
    props<{ payload: {startPage: number, maxPage: number, query: string | undefined} }>()
)

const loadIndustrySuccessAction = createAction(
    '[Industry Page] load industry success',
    props<{ payload: GetAllIndustryDtoDataRes[] }>()
)

const updateIndustryAction = createAction(
    '[Industry Page] update industry',
    props<{ payload: UpdateIndustryDtoReq }>()
)

const updateIndustrySuccessAction = createAction(
    '[Industry Page] update industry success',
    props<{ payload: UpdateIndustryDtoReq }>()
)

const deleteIndustryAction = createAction(
    '[Industry Page] delete industry',
    props<{ payload: string }>()
)

const deleteIndustrySuccessAction = createAction(
    '[Industry Page] delete industry success',
    props<{ payload: string }>()
)

const insertIndustryAction = createAction(
    '[Industry Page] insert industry',
    props<{ payload: InsertIndustryDtoReq }>()
)

const insertIndustrySuccessAction = createAction(
    '[Industry Page] insert industry success',
    props<{ payload: GetByIndustryIdDtoDataRes }>()
)

export {
    loadIndustryAction, loadIndustrySuccessAction, updateIndustryAction, updateIndustrySuccessAction,
    deleteIndustryAction, deleteIndustrySuccessAction, insertIndustryAction, insertIndustrySuccessAction
}