import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'
import { deleteThreadAction, deleteThreadSuccessAction, insertThreadAction, insertThreadSuccessAction, loadThreadAction, loadThreadSuccessAction, updateThreadAction, updateThreadSuccessAction } from './thread.action'
import { ThreadService } from '../../service/thread.service'
import { UpdateThreadDtoReq } from '../../dto/thread/update-thread-dto-req'
import { GetByThreadIdDtoDataRes } from '../../dto/thread/get-by-thread-id-dto-data-res'

@Injectable()
export class ThreadEffect {
    loadThreadEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadThreadAction),
            mergeMap(
                () => this.threadService.getAll().pipe(
                    map(result => loadThreadSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateThreadEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateThreadAction),
            mergeMap(
                ({ payload }) => this.threadService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateThreadDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateThreadSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteThreadEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteThreadAction),
            mergeMap(
                ({ payload }) => this.threadService.delete(payload).pipe(
                    map(result => deleteThreadSuccessAction({ payload }))
                )
            )
        )
    )

    insertThreadEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertThreadAction),
            mergeMap(
                ({ payload }) => this.threadService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByThreadIdDtoDataRes = new GetByThreadIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.typeCode = payload.typeCode
                        newPayload.typeName = payload.typeName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertThreadSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private threadService: ThreadService) { }
}