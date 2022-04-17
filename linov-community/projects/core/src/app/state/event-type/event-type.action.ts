import { createAction, props } from '@ngrx/store'

import { UpdateEventTypeDtoReq } from '../../dto/event-type/update-event-type-dto-req'
import { GetAllEventTypeDtoDataRes } from '../../dto/event-type/get-all-event-type-dto-data-res'
import { InsertEventTypeDtoReq } from '../../dto/event-type/insert-event-type-dto-req'
import { GetByEventTypeIdDtoDataRes } from '../../dto/event-type/get-by-event-type-id-dto-data-res'

const loadEventTypeAction = createAction(
    '[EventType Page] load event type',
    props<{ payload: {startPage: number, maxPage: number, query: string | undefined} }>()
)

const loadEventTypeSuccessAction = createAction(
    '[EventType Page] load event type success',
    props<{ payload: GetAllEventTypeDtoDataRes[] }>()
)

const updateEventTypeAction = createAction(
    '[EventType Page] update event type',
    props<{ payload: UpdateEventTypeDtoReq }>()
)

const updateEventTypeSuccessAction = createAction(
    '[EventType Page] update event type success',
    props<{ payload: UpdateEventTypeDtoReq }>()
)

const deleteEventTypeAction = createAction(
    '[EventType Page] delete event type',
    props<{ payload: string }>()
)

const deleteEventTypeSuccessAction = createAction(
    '[EventType Page] delete event type success',
    props<{ payload: string }>()
)

const insertEventTypeAction = createAction(
    '[EventType Page] insert event type',
    props<{ payload: InsertEventTypeDtoReq }>()
)

const insertEventTypeSuccessAction = createAction(
    '[EventType Page] insert event type success',
    props<{ payload: GetByEventTypeIdDtoDataRes }>()
)

export {
    loadEventTypeAction, loadEventTypeSuccessAction, updateEventTypeAction, updateEventTypeSuccessAction,
    deleteEventTypeAction, deleteEventTypeSuccessAction, insertEventTypeAction, insertEventTypeSuccessAction
}