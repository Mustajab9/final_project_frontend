import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteEventAction, deleteEventSuccessAction, insertEventAction, insertEventSuccessAction, loadEventAction, loadEventSuccessAction, updateEventAction, updateEventSuccessAction } from './event.action'
import { EventService } from '../../service/event.service'
import { UpdateEventDtoReq } from '../../dto/event/update-event-dto-req'
import { GetByEventIdDtoDataRes } from '../../dto/event/get-by-event-id-dto-data-res'

@Injectable()
export class EventEffect {
    loadEventffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadEventAction),
            mergeMap(
                () => this.eventService.getAll().pipe(
                    map(result => loadEventSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateEventAction),
            mergeMap(
                ({ payload }) => this.eventService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateEventDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateEventSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteEventAction),
            mergeMap(
                ({ payload }) => this.eventService.delete(payload).pipe(
                    map(result => deleteEventSuccessAction({ payload }))
                )
            )
        )
    )

    insertEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertEventAction),
            mergeMap(
                ({ payload }) => this.eventService.insert(payload.content, payload.file).pipe(
                    map(result => {
                        const newPayload: GetByEventIdDtoDataRes = new GetByEventIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.eventTitle = payload.content.eventTitle
                        newPayload.eventProvider = payload.content.eventProvider
                        newPayload.eventLocation = payload.content.eventLocation
                        newPayload.eventPrice = payload.content.eventPrice
                        newPayload.eventTimeStart = payload.content.eventTimeStart
                        newPayload.eventTimeEnd = payload.content.eventTimeEnd
                        newPayload.eventDateStart = payload.content.eventDateStart
                        newPayload.eventDateEnd = payload.content.eventDateEnd
                        newPayload.typeId = payload.content.eventTypeId
                        newPayload.categoryId = payload.content.categoryId
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertEventSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private eventService: EventService) { }
}