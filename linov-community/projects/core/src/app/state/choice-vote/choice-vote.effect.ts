import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { insertChoiceVoteAction, insertChoiceVoteSuccessAction, loadChoiceVoteAction, loadChoiceVoteSuccessAction } from './choice-vote.action'
import { ChoiceVoteService } from '../../service/choice-vote.service'
import { GetByChoiceVoteIdDtoDataRes } from '../../dto/choice-vote/get-by-choice-vote-id-dto-data-res'

@Injectable()
export class ChoiceVoteEffect {
    loadChoiceVoteEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadChoiceVoteAction),
            mergeMap(
                () => this.categoryService.getAll().pipe(
                    map(result => loadChoiceVoteSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    insertChoiceVoteEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertChoiceVoteAction),
            mergeMap(
                ({ payload }) => this.categoryService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByChoiceVoteIdDtoDataRes = new GetByChoiceVoteIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.categoryCode = payload.categoryCode
                        newPayload.categoryName = payload.categoryName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertChoiceVoteSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private categoryService: ChoiceVoteService) { }
}