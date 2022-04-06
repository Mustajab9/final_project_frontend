import { createAction, props } from '@ngrx/store'

import { UpdateProfilesDtoReq } from '../../dto/profiles/update-profiles-dto-req'
import { GetAllProfilesDtoDataRes } from '../../dto/profiles/get-all-profiles-dto-data-res'
import { InsertProfilesDtoReq } from '../../dto/profiles/insert-profiles-dto-req'
import { GetByProfilesIdDtoDataRes } from '../../dto/profiles/get-by-profiles-id-dto-data-res'

const loadProfilesAction = createAction(
    '[Profiles Page] load profiles'
)

const loadProfilesSuccessAction = createAction(
    '[Profiles Page] load profiles success',
    props<{ payload: GetAllProfilesDtoDataRes[] }>()
)

const updateProfilesAction = createAction(
    '[Profiles Page] update profiles',
    props<{ payload: UpdateProfilesDtoReq }>()
)

const updateProfilesSuccessAction = createAction(
    '[Profiles Page] update profiles success',
    props<{ payload: UpdateProfilesDtoReq }>()
)

const deleteProfilesAction = createAction(
    '[Profiles Page] delete profiles',
    props<{ payload: string }>()
)

const deleteProfilesSuccessAction = createAction(
    '[Profiles Page] delete profiles success',
    props<{ payload: string }>()
)

const insertProfilesAction = createAction(
    '[Profiles Page] insert profiles',
    props<{ payload: InsertProfilesDtoReq }>()
)

const insertProfilesSuccessAction = createAction(
    '[Profiles Page] insert profiles success',
    props<{ payload: GetByProfilesIdDtoDataRes }>()
)

export {
    loadProfilesAction, loadProfilesSuccessAction, updateProfilesAction, updateProfilesSuccessAction,
    deleteProfilesAction, deleteProfilesSuccessAction, insertProfilesAction, insertProfilesSuccessAction
}