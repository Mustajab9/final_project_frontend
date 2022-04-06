import { createAction, props } from '@ngrx/store'

import { UpdateEnrollEventDtoReq } from '../../dto/enroll-event/update-enroll-event-dto-req'
import { GetAllEnrollEventDtoDataRes } from '../../dto/enroll-event/get-all-enroll-event-dto-data-res'
import { InsertEnrollEventDtoReq } from '../../dto/enroll-event/insert-enroll-event-dto-req'
import { GetByEnrollEventIdDtoDataRes } from '../../dto/enroll-event/get-by-enroll-event-id-dto-data-res'

const loadEnrollEventAction = createAction(
    '[EnrollEvent Page] load enroll event'
)

const loadEnrollEventSuccessAction = createAction(
    '[EnrollEvent Page] load enroll event success',
    props<{ payload: GetAllEnrollEventDtoDataRes[] }>()
)

const updateEnrollEventAction = createAction(
    '[EnrollEvent Page] update enroll event',
    props<{ payload: UpdateEnrollEventDtoReq }>()
)

const updateEnrollEventSuccessAction = createAction(
    '[EnrollEvent Page] update enroll event success',
    props<{ payload: UpdateEnrollEventDtoReq }>()
)

const deleteEnrollEventAction = createAction(
    '[EnrollEvent Page] delete enroll event',
    props<{ payload: string }>()
)

const deleteEnrollEventSuccessAction = createAction(
    '[EnrollEvent Page] delete enroll event success',
    props<{ payload: string }>()
)

const insertEnrollEventAction = createAction(
    '[EnrollEvent Page] insert enroll event',
    props<{ payload: InsertEnrollEventDtoReq }>()
)

const insertEnrollEventSuccessAction = createAction(
    '[EnrollEvent Page] insert enroll event success',
    props<{ payload: GetByEnrollEventIdDtoDataRes }>()
)

export {
    loadEnrollEventAction, loadEnrollEventSuccessAction, updateEnrollEventAction, updateEnrollEventSuccessAction,
    deleteEnrollEventAction, deleteEnrollEventSuccessAction, insertEnrollEventAction, insertEnrollEventSuccessAction
}