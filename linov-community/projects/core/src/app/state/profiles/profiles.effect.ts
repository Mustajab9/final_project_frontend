import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteProfilesAction, deleteProfilesSuccessAction, insertProfilesAction, insertProfilesSuccessAction, loadProfilesAction, loadProfilesSuccessAction, updateProfilesAction, updateProfilesSuccessAction } from './profiles.action'

import { UpdateProfilesDtoReq } from '../../dto/profiles/update-profiles-dto-req'
import { GetByProfilesIdDtoDataRes } from '../../dto/profiles/get-by-profiles-id-dto-data-res'
import { ProfilesService } from '../../service/profiles.service'

@Injectable()
export class ProfilesEffect {
    loadProfilesEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadProfilesAction),
            mergeMap(
                () => this.profileService.getAll().pipe(
                    map(result => loadProfilesSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateProfilesEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateProfilesAction),
            mergeMap(
                ({ payload }) => this.profileService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateProfilesDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateProfilesSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteProfilesEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteProfilesAction),
            mergeMap(
                ({ payload }) => this.profileService.delete(payload).pipe(
                    map(result => deleteProfilesSuccessAction({ payload }))
                )
            )
        )
    )

    insertProfilesEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertProfilesAction),
            mergeMap(
                ({ payload }) => this.profileService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByProfilesIdDtoDataRes = new GetByProfilesIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.categoryCode = payload.categoryCode
                        newPayload.categoryName = payload.categoryName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertProfilesSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private profileService: ProfilesService) { }
}