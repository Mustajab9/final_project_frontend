import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deletePriceListMemberAction, deletePriceListMemberSuccessAction, insertPriceListMemberAction, insertPriceListMemberSuccessAction, loadPriceListMemberAction, loadPriceListMemberSuccessAction, updatePriceListMemberAction, updatePriceListMemberSuccessAction } from './price-list-member.action'
import { PriceListMemberService } from '../../service/price-list-member.service'
import { UpdatePriceListMemberDtoReq } from '../../dto/price-list-member/update-price-list-member-dto-req'
import { GetByPriceListMemberIdDtoDataRes } from '../../dto/price-list-member/get-by-price-list-member-id-dto-data-res'

@Injectable()
export class PriceListMemberEffect {
    loadPriceListMemberEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadPriceListMemberAction),
            mergeMap(
                ({ payload }) => this.priceListMemberService.getAll(payload.startPage, payload.maxPage, payload.query).pipe(
                    map(result => loadPriceListMemberSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updatePriceListMemberEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updatePriceListMemberAction),
            mergeMap(
                ({ payload }) => this.priceListMemberService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdatePriceListMemberDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updatePriceListMemberSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deletePriceListMemberEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deletePriceListMemberAction),
            mergeMap(
                ({ payload }) => this.priceListMemberService.delete(payload).pipe(
                    map(result => deletePriceListMemberSuccessAction({ payload }))
                )
            )
        )
    )

    insertPriceListMemberEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertPriceListMemberAction),
            mergeMap(
                ({ payload }) => this.priceListMemberService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByPriceListMemberIdDtoDataRes = new GetByPriceListMemberIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.priceCode = payload.priceCode
                        newPayload.duration = payload.duration
                        newPayload.priceNominal = payload.priceNominal
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertPriceListMemberSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private priceListMemberService: PriceListMemberService) { }
}