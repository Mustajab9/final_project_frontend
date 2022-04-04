import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deletePositionAction, deletePositionSuccessAction, insertPositionAction, insertPositionSuccessAction, loadPositionAction, loadPositionSuccessAction, updatePositionAction, updatePositionSuccessAction } from './province.action'
import { PositionService } from '../../service/position.service'
import { UpdatePositionDtoReq } from '../../dto/position/update-position-dto-req'
import { GetByPositionIdDtoDataRes } from '../../dto/position/get-by-position-id-dto-data-res'

@Injectable()
export class PositionEffect {
    loadPositionEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadPositionAction),
            mergeMap(
                ({ payload }) => this.positionService.getAll(payload.query, payload.startPage, payload.maxPage).pipe(
                    map(result => loadPositionSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updatePositionEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updatePositionAction),
            mergeMap(
                ({ payload }) => this.positionService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdatePositionDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updatePositionSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deletePositionEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deletePositionAction),
            mergeMap(
                ({ payload }) => this.positionService.delete(payload).pipe(
                    map(result => deletePositionSuccessAction({ payload }))
                )
            )
        )
    )

    insertPositionEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertPositionAction),
            mergeMap(
                ({ payload }) => this.positionService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByPositionIdDtoDataRes = new GetByPositionIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.positionCode = payload.positionCode
                        newPayload.positionName = payload.positionName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertPositionSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private positionService: PositionService) { }
}