import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteEventTypeAction, deleteEventTypeSuccessAction, insertEventTypeAction, insertEventTypeSuccessAction, loadEventTypeAction, loadEventTypeSuccessAction, updateEventTypeAction, updateEventTypeSuccessAction } from './event-type.action'
import { EventTypeService } from '../../service/event-type.service'
import { UpdateEventTypeDtoReq } from '../../dto/event-type/update-event-type-dto-req'
import { GetByEventTypeIdDtoDataRes } from '../../dto/event-type/get-by-event-type-id-dto-data-res'

@Injectable()
export class EventTypeEffect {
    loadEventTypeEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadEventTypeAction),
            mergeMap(
                ({ payload }) => this.eventTypeService.getAll(payload.startPage, payload.maxPage, payload.query).pipe(
                    map(result => loadEventTypeSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateEventTypeEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateEventTypeAction),
            mergeMap(
                ({ payload }) => this.eventTypeService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateEventTypeDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateEventTypeSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteEventTypeEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteEventTypeAction),
            mergeMap(
                ({ payload }) => this.eventTypeService.delete(payload).pipe(
                    map(result => deleteEventTypeSuccessAction({ payload }))
                )
            )
        )
    )

    insertEventTypeEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertEventTypeAction),
            mergeMap(
                ({ payload }) => this.eventTypeService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByEventTypeIdDtoDataRes = new GetByEventTypeIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.typeCode = payload.typeCode
                        newPayload.typeName = payload.typeName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertEventTypeSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private eventTypeService: EventTypeService) { }
}