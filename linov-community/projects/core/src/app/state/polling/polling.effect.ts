import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deletePollingAction, deletePollingSuccessAction, insertPollingAction, insertPollingSuccessAction, loadPollingAction, loadPollingSuccessAction } from './polling.action'
import { PollingService } from '../../service/polling.service'
import { GetByPollingIdDtoDataRes } from '../../dto/polling/get-by-polling-id-dto-data-res'

@Injectable()
export class PollingEffect {
    loadPollingEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadPollingAction),
            mergeMap(
                () => this.pollingService.getAll().pipe(
                    map(result => loadPollingSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    deletePollingEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deletePollingAction),
            mergeMap(
                ({ payload }) => this.pollingService.delete(payload).pipe(
                    map(result => deletePollingSuccessAction({ payload }))
                )
            )
        )
    )

    insertPollingEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertPollingAction),
            mergeMap(
                ({ payload }) => this.pollingService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByPollingIdDtoDataRes = new GetByPollingIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.categoryCode = payload.categoryCode
                        newPayload.categoryName = payload.categoryName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertPollingSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private pollingService: PollingService) { }
}