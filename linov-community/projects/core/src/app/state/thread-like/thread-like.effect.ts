import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'
import { deleteThreadLikeAction, deleteThreadLikeSuccessAction, insertThreadLikeAction, insertThreadLikeSuccessAction, loadThreadLikeAction, loadThreadLikeSuccessAction } from './thread-like.action'
import { ThreadLikeService } from '../../service/thread-like.service'
import { GetByThreadLikeIdDtoDataRes } from '../../dto/thread-like/get-by-thread-like-id-dto-data-res'

@Injectable()
export class ThreadLikeEffect {
    loadThreadLikeEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadThreadLikeAction),
            mergeMap(
                () => this.threadLikeService.getAll().pipe(
                    map(result => loadThreadLikeSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    deleteThreadLikeEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteThreadLikeAction),
            mergeMap(
                ({ payload }) => this.threadLikeService.delete(payload).pipe(
                    map(result => deleteThreadLikeSuccessAction({ payload }))
                )
            )
        )
    )

    insertThreadLikeEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertThreadLikeAction),
            mergeMap(
                ({ payload }) => this.threadLikeService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByThreadLikeIdDtoDataRes = new GetByThreadLikeIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.typeCode = payload.typeCode
                        newPayload.typeName = payload.typeName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertThreadLikeSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private threadLikeService: ThreadLikeService) { }
}