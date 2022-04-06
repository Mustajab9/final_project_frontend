import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteProfileSosmedAction, deleteProfileSosmedSuccessAction, insertProfileSosmedAction, insertProfileSosmedSuccessAction, loadProfileSosmedAction, loadProfileSosmedSuccessAction, updateProfileSosmedAction, updateProfileSosmedSuccessAction } from './profile-sosmed.action'
import { ProfileSosmedService } from '../../service/profile-sosmed.service'
import { UpdateProfileSosmedDtoReq } from '../../dto/profile-sosmed/update-profile-sosmed-dto-req'
import { GetByProfileSosmedIdDtoDataRes } from '../../dto/profile-sosmed/get-by-profile-sosmed-id-dto-data-res'

@Injectable()
export class ProfileSosmedEffect {
    loadProfileSosmedEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadProfileSosmedAction),
            mergeMap(
                () => this.profileSosmedService.getAll().pipe(
                    map(result => loadProfileSosmedSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateProfileSosmedEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateProfileSosmedAction),
            mergeMap(
                ({ payload }) => this.profileSosmedService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateProfileSosmedDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateProfileSosmedSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteProfileSosmedEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteProfileSosmedAction),
            mergeMap(
                ({ payload }) => this.profileSosmedService.delete(payload).pipe(
                    map(result => deleteProfileSosmedSuccessAction({ payload }))
                )
            )
        )
    )

    insertProfileSosmedEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertProfileSosmedAction),
            mergeMap(
                ({ payload }) => this.profileSosmedService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByProfileSosmedIdDtoDataRes = new GetByProfileSosmedIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.categoryCode = payload.categoryCode
                        newPayload.categoryName = payload.categoryName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertProfileSosmedSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private profileSosmedService: ProfileSosmedService) { }
}