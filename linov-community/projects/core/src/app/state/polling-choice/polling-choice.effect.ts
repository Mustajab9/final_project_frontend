import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deletePollingChoiceAction, deletePollingChoiceSuccessAction, insertPollingChoiceAction, insertPollingChoiceSuccessAction, loadPollingChoiceAction, loadPollingChoiceSuccessAction, updatePollingChoiceAction, updatePollingChoiceSuccessAction } from './polling-choice.action'
import { PollingChoiceService } from '../../service/polling-choice.service'
import { UpdatePollingChoiceDtoReq } from '../../dto/polling-choice/update-polling-choice-dto-req'
import { GetByPollingChoiceIdDtoDataRes } from '../../dto/polling-choice/get-by-polling-choice-id-dto-data-res'

@Injectable()
export class PollingChoiceEffect {
    loadPollingChoiceEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadPollingChoiceAction),
            mergeMap(
                () => this.pollingChoiceService.getAll().pipe(
                    map(result => loadPollingChoiceSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updatePollingChoiceEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updatePollingChoiceAction),
            mergeMap(
                ({ payload }) => this.pollingChoiceService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdatePollingChoiceDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updatePollingChoiceSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deletePollingChoiceEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deletePollingChoiceAction),
            mergeMap(
                ({ payload }) => this.pollingChoiceService.delete(payload).pipe(
                    map(result => deletePollingChoiceSuccessAction({ payload }))
                )
            )
        )
    )

    insertPollingChoiceEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertPollingChoiceAction),
            mergeMap(
                ({ payload }) => this.pollingChoiceService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByPollingChoiceIdDtoDataRes = new GetByPollingChoiceIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.categoryCode = payload.categoryCode
                        newPayload.categoryName = payload.categoryName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertPollingChoiceSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private pollingChoiceService: PollingChoiceService) { }
}