import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteBookmarkAction, deleteBookmarkSuccessAction, insertBookmarkAction, insertBookmarkSuccessAction, loadBookmarkAction, loadBookmarkSuccessAction } from './bookmark.action'
import { BookmarkService } from '../../service/bookmark.service'
import { GetByBookmarkIdDtoDataRes } from '../../dto/bookmark/get-by-bookmark-id-dto-data-res'

@Injectable()
export class BookmarkEffect {
    loadBookmarkEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadBookmarkAction),
            mergeMap(
                () => this.bookmarkService.getAll().pipe(
                    map(result => loadBookmarkSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    deleteBookmarkEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteBookmarkAction),
            mergeMap(
                ({ payload }) => this.bookmarkService.delete(payload).pipe(
                    map(result => deleteBookmarkSuccessAction({ payload }))
                )
            )
        )
    )

    insertBookmarkEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertBookmarkAction),
            mergeMap(
                ({ payload }) => this.bookmarkService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByBookmarkIdDtoDataRes = new GetByBookmarkIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.threadId = payload.threadId
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertBookmarkSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private bookmarkService: BookmarkService) { }
}