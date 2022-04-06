import { createAction, props } from '@ngrx/store'

import { UpdatePollingChoiceDtoReq } from '../../dto/polling-choice/update-polling-choice-dto-req'
import { GetAllPollingChoiceDtoDataRes } from '../../dto/polling-choice/get-all-polling-choice-dto-data-res'
import { InsertPollingChoiceDtoReq } from '../../dto/polling-choice/insert-polling-choice-dto-req'
import { GetByPollingChoiceIdDtoDataRes } from '../../dto/polling-choice/get-by-polling-choice-id-dto-data-res'

const loadPollingChoiceAction = createAction(
    '[PollingChoice Page] load polling choice'
)

const loadPollingChoiceSuccessAction = createAction(
    '[PollingChoice Page] load polling choice success',
    props<{ payload: GetAllPollingChoiceDtoDataRes[] }>()
)

const updatePollingChoiceAction = createAction(
    '[PollingChoice Page] update polling choice',
    props<{ payload: UpdatePollingChoiceDtoReq }>()
)

const updatePollingChoiceSuccessAction = createAction(
    '[PollingChoice Page] update polling choice success',
    props<{ payload: UpdatePollingChoiceDtoReq }>()
)

const deletePollingChoiceAction = createAction(
    '[PollingChoice Page] delete polling choice',
    props<{ payload: string }>()
)

const deletePollingChoiceSuccessAction = createAction(
    '[PollingChoice Page] delete polling choice success',
    props<{ payload: string }>()
)

const insertPollingChoiceAction = createAction(
    '[PollingChoice Page] insert polling choice',
    props<{ payload: InsertPollingChoiceDtoReq }>()
)

const insertPollingChoiceSuccessAction = createAction(
    '[PollingChoice Page] insert polling choice success',
    props<{ payload: GetByPollingChoiceIdDtoDataRes }>()
)

export {
    loadPollingChoiceAction, loadPollingChoiceSuccessAction, updatePollingChoiceAction, updatePollingChoiceSuccessAction,
    deletePollingChoiceAction, deletePollingChoiceSuccessAction, insertPollingChoiceAction, insertPollingChoiceSuccessAction
}