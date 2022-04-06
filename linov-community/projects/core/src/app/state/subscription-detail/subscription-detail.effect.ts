import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { insertSubscriptionDetailAction, insertSubscriptionDetailSuccessAction, loadSubscriptionDetailAction, loadSubscriptionDetailSuccessAction} from './subscription-detail.action'
import { SubscriptionDetailService } from '../../service/subscription-detail.service'
import { GetBySubscriptionDetailIdDtoDataRes } from '../../dto/subscription-detail/get-by-subscription-detail-id-dto-data-res'

@Injectable()
export class SubscriptionDetailEffect {
    loadSubscriptionDetailEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadSubscriptionDetailAction),
            mergeMap(
                () => this.subscriptionDetailService.getAll().pipe(
                    map(result => loadSubscriptionDetailSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    insertSubscriptionDetailEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertSubscriptionDetailAction),
            mergeMap(
                ({ payload }) => this.subscriptionDetailService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetBySubscriptionDetailIdDtoDataRes = new GetBySubscriptionDetailIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.profileId = payload.profileId
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertSubscriptionDetailSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private subscriptionDetailService: SubscriptionDetailService) { }
}