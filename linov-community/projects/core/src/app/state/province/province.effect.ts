import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteProvinceAction, deleteProvinceSuccessAction, insertProvinceAction, insertProvinceSuccessAction, loadProvinceAction, loadProvinceSuccessAction, updateProvinceAction, updateProvinceSuccessAction } from './province.action'
import { ProvinceService } from '../../service/province.service'
import { UpdateProvinceDtoReq } from '../../dto/province/update-province-dto-req'
import { GetByProvinceIdDtoDataRes } from '../../dto/province/get-by-province-id-dto-data-res'

@Injectable()
export class ProvinceEffect {
    loadProvinceEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadProvinceAction),
            mergeMap(
                ({ payload }) => this.provinceService.getAll(payload.startPage, payload.maxPage, payload.query).pipe(
                    map(result => loadProvinceSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateProvinceEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateProvinceAction),
            mergeMap(
                ({ payload }) => this.provinceService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateProvinceDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateProvinceSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteProvinceEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteProvinceAction),
            mergeMap(
                ({ payload }) => this.provinceService.delete(payload).pipe(
                    map(result => deleteProvinceSuccessAction({ payload }))
                )
            )
        )
    )

    insertProvinceEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertProvinceAction),
            mergeMap(
                ({ payload }) => this.provinceService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByProvinceIdDtoDataRes = new GetByProvinceIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.provinceCode = payload.provinceCode
                        newPayload.provinceName = payload.provinceName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertProvinceSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private provinceService: ProvinceService) { }
}