import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteEnrollEventAction, deleteEnrollEventSuccessAction, insertEnrollEventAction, insertEnrollEventSuccessAction, loadEnrollEventAction, loadEnrollEventSuccessAction, updateEnrollEventAction, updateEnrollEventSuccessAction } from './enroll-event.action'
import { EnrollEventService } from '../../service/enroll-event.service'
import { UpdateEnrollEventDtoReq } from '../../dto/enroll-event/update-enroll-event-dto-req'
import { GetByEnrollEventIdDtoDataRes } from '../../dto/enroll-event/get-by-enroll-event-id-dto-data-res'

@Injectable()
export class EnrollEventEffect {
    loadEnrollEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadEnrollEventAction),
            mergeMap(
                () => this.enrollEventService.getAll().pipe(
                    map(result => loadEnrollEventSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateEnrollEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateEnrollEventAction),
            mergeMap(
                ({ payload }) => this.enrollEventService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateEnrollEventDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateEnrollEventSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteEnrollEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteEnrollEventAction),
            mergeMap(
                ({ payload }) => this.enrollEventService.delete(payload).pipe(
                    map(result => deleteEnrollEventSuccessAction({ payload }))
                )
            )
        )
    )

    insertEnrollEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertEnrollEventAction),
            mergeMap(
                ({ payload }) => this.enrollEventService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByEnrollEventIdDtoDataRes = new GetByEnrollEventIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.categoryCode = payload.categoryCode
                        newPayload.categoryName = payload.categoryName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertEnrollEventSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private enrollEventService: EnrollEventService) { }
}