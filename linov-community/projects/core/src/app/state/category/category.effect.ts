import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteCategoryAction, deleteCategorySuccessAction, insertCategoryAction, insertCategorySuccessAction, loadCategoryAction, loadCategorySuccessAction, updateCategoryAction, updateCategorySuccessAction } from './category.action'
import { CategoryService } from '../../service/category.service'
import { UpdateCategoryDtoReq } from '../../dto/category/update-category-dto-req'
import { GetByCategoryIdDtoDataRes } from '../../dto/category/get-by-category-id-dto-data-res'

@Injectable()
export class CategoryEffect {
    loadCategoryEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadCategoryAction),
            mergeMap(
                ({ payload }) => this.categoryService.getAll(payload.startPage, payload.maxPage, payload.query).pipe(
                    map(result => loadCategorySuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateCategoryEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateCategoryAction),
            mergeMap(
                ({ payload }) => this.categoryService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateCategoryDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateCategorySuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteCategoryEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteCategoryAction),
            mergeMap(
                ({ payload }) => this.categoryService.delete(payload).pipe(
                    map(result => deleteCategorySuccessAction({ payload }))
                )
            )
        )
    )

    insertCategoryEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertCategoryAction),
            mergeMap(
                ({ payload }) => this.categoryService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByCategoryIdDtoDataRes = new GetByCategoryIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.categoryCode = payload.categoryCode
                        newPayload.categoryName = payload.categoryName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertCategorySuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private categoryService: CategoryService) { }
}