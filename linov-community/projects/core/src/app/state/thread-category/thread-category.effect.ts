import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'
import { deleteThreadCategoryAction, deleteThreadCategorySuccessAction, insertThreadCategoryAction, insertThreadCategorySuccessAction, loadThreadCategoryAction, loadThreadCategorySuccessAction } from './thread-category.action'
import { ThreadCategoryService } from '../../service/thread-category.service'
import { GetByThreadCategoryIdDtoDataRes } from '../../dto/thread-category/get-by-thread-category-id-dto-data-res'

@Injectable()
export class ThreadCategoryEffect {
    loadThreadCategoryEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadThreadCategoryAction),
            mergeMap(
                () => this.threadCategoryService.getAll().pipe(
                    map(result => loadThreadCategorySuccessAction({ payload: result.data }))
                )
            )
        )
    )

    deleteThreadCategoryEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteThreadCategoryAction),
            mergeMap(
                ({ payload }) => this.threadCategoryService.delete(payload).pipe(
                    map(result => deleteThreadCategorySuccessAction({ payload }))
                )
            )
        )
    )

    insertThreadCategoryEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertThreadCategoryAction),
            mergeMap(
                ({ payload }) => this.threadCategoryService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByThreadCategoryIdDtoDataRes = new GetByThreadCategoryIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.typeCode = payload.typeCode
                        newPayload.typeName = payload.typeName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertThreadCategorySuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private threadCategoryService: ThreadCategoryService) { }
}