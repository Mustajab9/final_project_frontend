import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteSubscriptionAction, deleteSubscriptionSuccessAction, insertSubscriptionAction, insertSubscriptionSuccessAction, loadSubscriptionAction, loadSubscriptionSuccessAction, updateSubscriptionAction, updateSubscriptionSuccessAction } from './subscription.action'
import { SubscriptionService } from '../../service/subscription.service'
import { UpdateSubscriptionDtoReq } from '../../dto/subscription/update-subscription-dto-req'
import { GetBySubscriptionIdDtoDataRes } from '../../dto/subscription/get-by-subscription-id-dto-data-res'

@Injectable()
export class SubscriptionEffect {
    loadSubscriptionEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadSubscriptionAction),
            mergeMap(
                ({ payload }) => this.subscriptionService.getAll(payload.startPage, payload.maxPage, payload.query).pipe(
                    map(result => loadSubscriptionSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateSubscriptionEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateSubscriptionAction),
            mergeMap(
                ({ payload }) => this.subscriptionService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateSubscriptionDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateSubscriptionSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteSubscriptionEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteSubscriptionAction),
            mergeMap(
                ({ payload }) => this.subscriptionService.delete(payload).pipe(
                    map(result => deleteSubscriptionSuccessAction({ payload }))
                )
            )
        )
    )

    insertSubscriptionEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertSubscriptionAction),
            mergeMap(
                ({ payload }) => this.subscriptionService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetBySubscriptionIdDtoDataRes = new GetBySubscriptionIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.profileId = payload.profileId
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertSubscriptionSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private subscriptionService: SubscriptionService) { }
}