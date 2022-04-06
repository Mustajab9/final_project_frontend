import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deletePriceListEventAction, deletePriceListEventSuccessAction, insertPriceListEventAction, insertPriceListEventSuccessAction, loadPriceListEventAction, loadPriceListEventSuccessAction, updatePriceListEventAction, updatePriceListEventSuccessAction } from './price-list-event.action'
import { PriceListEventService } from '../../service/price-list-event.service'
import { UpdatePriceListEventDtoReq } from '../../dto/price-list-event/update-price-list-event-dto-req'
import { GetByPriceListEventIdDtoDataRes } from '../../dto/price-list-event/get-by-price-list-event-id-dto-data-res'

@Injectable()
export class PriceListEventEffect {
    loadPriceListEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadPriceListEventAction),
            mergeMap(
                ({ payload }) => this.priceListEventService.getAll(payload.startPage, payload.maxPage, payload.query).pipe(
                    map(result => loadPriceListEventSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updatePriceListEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updatePriceListEventAction),
            mergeMap(
                ({ payload }) => this.priceListEventService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdatePriceListEventDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updatePriceListEventSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deletePriceListEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deletePriceListEventAction),
            mergeMap(
                ({ payload }) => this.priceListEventService.delete(payload).pipe(
                    map(result => deletePriceListEventSuccessAction({ payload }))
                )
            )
        )
    )

    insertPriceListEventEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertPriceListEventAction),
            mergeMap(
                ({ payload }) => this.priceListEventService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByPriceListEventIdDtoDataRes = new GetByPriceListEventIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.priceCode = payload.priceCode
                        newPayload.priceName = payload.priceName
                        newPayload.priceNominal = payload.priceNominal
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertPriceListEventSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private priceListEventService: PriceListEventService) { }
}