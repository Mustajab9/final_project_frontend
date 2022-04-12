import { createAction, props } from '@ngrx/store'

import { UpdateEventDtoReq } from '../../dto/event/update-event-dto-req'
import { GetAllEventDtoDataRes } from '../../dto/event/get-all-event-dto-data-res'
import { InsertEventDtoReq } from '../../dto/event/insert-event-dto-req'
import { GetByEventIdDtoDataRes } from '../../dto/event/get-by-event-id-dto-data-res'

const loadEventAction = createAction(
    '[Event Page] load event'
)

const loadEventSuccessAction = createAction(
    '[Event Page] load event success',
    props<{ payload: GetAllEventDtoDataRes[] }>()
)

const updateEventAction = createAction(
    '[Event Page] update event',
    props<{ payload: UpdateEventDtoReq }>()
)

const updateEventSuccessAction = createAction(
    '[Event Page] update event success',
    props<{ payload: UpdateEventDtoReq }>()
)

const deleteEventAction = createAction(
    '[Event Page] delete event',
    props<{ payload: string }>()
)

const deleteEventSuccessAction = createAction(
    '[Event Page] delete event success',
    props<{ payload: string }>()
)

const insertEventAction = createAction(
    '[Event Page] insert event',
    props<{ payload: {content: InsertEventDtoReq, file?: File } }>()
)

const insertEventSuccessAction = createAction(
    '[Event Page] insert event success',
    props<{ payload: GetByEventIdDtoDataRes }>()
)

export {
    loadEventAction, loadEventSuccessAction, updateEventAction, updateEventSuccessAction,
    deleteEventAction, deleteEventSuccessAction, insertEventAction, insertEventSuccessAction
}