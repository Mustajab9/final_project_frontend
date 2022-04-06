import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'
import { deleteThreadCommentAction, deleteThreadCommentSuccessAction, insertThreadCommentAction, insertThreadCommentSuccessAction, loadThreadCommentAction, loadThreadCommentSuccessAction } from './thread-comment.action'
import { ThreadCommentService } from '../../service/thread-comment.service'
import { GetByThreadCommentIdDtoDataRes } from '../../dto/thread-comment/get-by-thread-comment-id-dto-data-res'

@Injectable()
export class ThreadCommentEffect {
    loadThreadCommentEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadThreadCommentAction),
            mergeMap(
                () => this.threadCommentService.getAll().pipe(
                    map(result => loadThreadCommentSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    deleteThreadCommentEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteThreadCommentAction),
            mergeMap(
                ({ payload }) => this.threadCommentService.delete(payload).pipe(
                    map(result => deleteThreadCommentSuccessAction({ payload }))
                )
            )
        )
    )

    insertThreadCommentEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertThreadCommentAction),
            mergeMap(
                ({ payload }) => this.threadCommentService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByThreadCommentIdDtoDataRes = new GetByThreadCommentIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.typeCode = payload.typeCode
                        newPayload.typeName = payload.typeName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertThreadCommentSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private threadCommentService: ThreadCommentService) { }
}