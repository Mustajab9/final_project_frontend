import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteSocialMediaAction, deleteSocialMediaSuccessAction, insertSocialMediaAction, insertSocialMediaSuccessAction, loadSocialMediaAction, loadSocialMediaSuccessAction, updateSocialMediaAction, updateSocialMediaSuccessAction } from './social-media.action'
import { SocialMediaService } from '../../service/social-media.service'
import { UpdateSocialMediaDtoReq } from '../../dto/social-media/update-social-media-dto-req'
import { GetBySocialMediaIdDtoDataRes } from '../../dto/social-media/get-by-social-media-id-dto-data-res'

@Injectable()
export class SocialMediaEffect {
    loadSocialMediaEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadSocialMediaAction),
            mergeMap(
                ({ payload }) => this.socialMediaService.getAll(payload.query, payload.startPage, payload.maxPage).pipe(
                    map(result => loadSocialMediaSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updatSocialMediaEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateSocialMediaAction),
            mergeMap(
                ({ payload }) => this.socialMediaService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateSocialMediaDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateSocialMediaSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteSocialMediaEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteSocialMediaAction),
            mergeMap(
                ({ payload }) => this.socialMediaService.delete(payload).pipe(
                    map(result => deleteSocialMediaSuccessAction({ payload }))
                )
            )
        )
    )

    insertSocialMediaEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertSocialMediaAction),
            mergeMap(
                ({ payload }) => this.socialMediaService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetBySocialMediaIdDtoDataRes = new GetBySocialMediaIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.socialMediaCode = payload.socialMediaCode
                        newPayload.socialMediaName = payload.socialMediaName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertSocialMediaSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private socialMediaService: SocialMediaService) { }
}