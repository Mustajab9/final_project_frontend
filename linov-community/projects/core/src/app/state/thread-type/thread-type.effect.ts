import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'
import { deleteThreadTypeAction, deleteThreadTypeSuccessAction, insertThreadTypeAction, insertThreadTypeSuccessAction, loadThreadTypeAction, loadThreadTypeSuccessAction, updateThreadTypeAction, updateThreadTypeSuccessAction } from './thread-type.action'
import { ThreadTypeService } from '../../service/thread-type.service'
import { UpdateThreadTypeDtoReq } from '../../dto/thread-type/update-thread-type-dto-req'
import { GetByThreadTypeIdDtoDataRes } from '../../dto/thread-type/get-by-thread-type-id-dto-data-res'

@Injectable()
export class ThreadTypeEffect {
    loadThreadTypeEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadThreadTypeAction),
            mergeMap(
                ({ payload }) => this.threadTypeService.getAll(payload.startPage, payload.maxPage, payload.query).pipe(
                    map(result => loadThreadTypeSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateThreadTypeEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateThreadTypeAction),
            mergeMap(
                ({ payload }) => this.threadTypeService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateThreadTypeDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateThreadTypeSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteThreadTypeEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteThreadTypeAction),
            mergeMap(
                ({ payload }) => this.threadTypeService.delete(payload).pipe(
                    map(result => deleteThreadTypeSuccessAction({ payload }))
                )
            )
        )
    )

    insertThreadTypeEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertThreadTypeAction),
            mergeMap(
                ({ payload }) => this.threadTypeService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByThreadTypeIdDtoDataRes = new GetByThreadTypeIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.typeCode = payload.typeCode
                        newPayload.typeName = payload.typeName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertThreadTypeSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private threadTypeService: ThreadTypeService) { }
}