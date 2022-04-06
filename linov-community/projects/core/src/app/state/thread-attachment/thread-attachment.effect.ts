import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'
import { deleteThreadAttachmentAction, deleteThreadAttachmentSuccessAction, insertThreadAttachmentAction, insertThreadAttachmentSuccessAction, loadThreadAttachmentAction, loadThreadAttachmentSuccessAction} from './thread-attachment.action'
import { ThreadAttachmentService } from '../../service/thread-attachment.service'
import { GetByThreadAttachmentIdDtoDataRes } from '../../dto/thread-attachment/get-by-thread-attachment-id-dto-data-res'

@Injectable()
export class ThreadAttachmentEffect {
    loadThreadAttachmentEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadThreadAttachmentAction),
            mergeMap(
                () => this.threadAttachmentService.getAll().pipe(
                    map(result => loadThreadAttachmentSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    deleteThreadAttachmentEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteThreadAttachmentAction),
            mergeMap(
                ({ payload }) => this.threadAttachmentService.delete(payload).pipe(
                    map(result => deleteThreadAttachmentSuccessAction({ payload }))
                )
            )
        )
    )

    insertThreadAttachmentEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertThreadAttachmentAction),
            mergeMap(
                ({ payload }) => this.threadAttachmentService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByThreadAttachmentIdDtoDataRes = new GetByThreadAttachmentIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.typeCode = payload.typeCode
                        newPayload.typeName = payload.typeName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertThreadAttachmentSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private threadAttachmentService: ThreadAttachmentService) { }
}