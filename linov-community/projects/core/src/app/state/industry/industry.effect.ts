import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteIndustryAction, deleteIndustrySuccessAction, insertIndustryAction, insertIndustrySuccessAction, loadIndustryAction, loadIndustrySuccessAction, updateIndustryAction, updateIndustrySuccessAction } from './industry.action'
import { IndustryService } from '../../service/industry.service'
import { UpdateIndustryDtoReq } from '../../dto/industry/update-industry-dto-req'
import { GetByIndustryIdDtoDataRes } from '../../dto/industry/get-by-industry-id-dto-data-res'

@Injectable()
export class IndustryEffect {
    loadIndustryEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadIndustryAction),
            mergeMap(
                ({ payload }) => this.industryService.getAll(payload.query, payload.startPage, payload.maxPage).pipe(
                    map(result => loadIndustrySuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateIndustryEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateIndustryAction),
            mergeMap(
                ({ payload }) => this.industryService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateIndustryDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateIndustrySuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteIndustryEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteIndustryAction),
            mergeMap(
                ({ payload }) => this.industryService.delete(payload).pipe(
                    map(result => deleteIndustrySuccessAction({ payload }))
                )
            )
        )
    )

    insertIndustryEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertIndustryAction),
            mergeMap(
                ({ payload }) => this.industryService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByIndustryIdDtoDataRes = new GetByIndustryIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.industryCode = payload.industryCode
                        newPayload.industryName = payload.industryName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertIndustrySuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private industryService: IndustryService) { }
}