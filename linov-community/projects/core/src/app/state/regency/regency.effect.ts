import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteRegencyAction, deleteRegencySuccessAction, insertRegencyAction, insertRegencySuccessAction, loadRegencyAction, loadRegencySuccessAction, updateRegencyAction, updateRegencySuccessAction } from './regency.action'
import {RegencyService } from '../../service/regency.service'
import { UpdateRegencyDtoReq } from '../../dto/regency/update-regency-dto-req'
import { GetByRegencyIdDtoDataRes } from '../../dto/regency/get-by-regency-id-dto-data-res'

@Injectable()
export class RegencyEffect {
    loadRegencyEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadRegencyAction),
            mergeMap(
                ({ payload }) => this.regencyService.getAll(payload.query, payload.startPage, payload.maxPage).pipe(
                    map(result => loadRegencySuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateRegencyEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateRegencyAction),
            mergeMap(
                ({ payload }) => this.regencyService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateRegencyDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateRegencySuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteRegencyEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteRegencyAction),
            mergeMap(
                ({ payload }) => this.regencyService.delete(payload).pipe(
                    map(result => deleteRegencySuccessAction({ payload }))
                )
            )
        )
    )

    insertRegencyEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertRegencyAction),
            mergeMap(
                ({ payload }) => this.regencyService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByRegencyIdDtoDataRes = new GetByRegencyIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.regancyCode = payload.regencyCode
                        newPayload.regancyName = payload.regencyName
                        newPayload.provinceId = payload.provinceId
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertRegencySuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private regencyService: RegencyService) { }
}