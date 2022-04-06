import { createAction, props } from '@ngrx/store'

import { UpdateProfileSosmedDtoReq } from '../../dto/profile-sosmed/update-profile-sosmed-dto-req'
import { GetAllProfileSosmedDtoDataRes } from '../../dto/profile-sosmed/get-all-profile-sosmed-dto-data-res'
import { InsertProfileSosmedDtoReq } from '../../dto/profile-sosmed/insert-profile-sosmed-dto-req'
import { GetByProfileSosmedIdDtoDataRes } from '../../dto/profile-sosmed/get-by-profile-sosmed-id-dto-data-res'

const loadProfileSosmedAction = createAction(
    '[ProfileSosmed Page] load profile sosmed'
)

const loadProfileSosmedSuccessAction = createAction(
    '[ProfileSosmed Page] load profile sosmed success',
    props<{ payload: GetAllProfileSosmedDtoDataRes[] }>()
)

const updateProfileSosmedAction = createAction(
    '[ProfileSosmed Page] update profile sosmed',
    props<{ payload: UpdateProfileSosmedDtoReq }>()
)

const updateProfileSosmedSuccessAction = createAction(
    '[ProfileSosmed Page] update profile sosmed success',
    props<{ payload: UpdateProfileSosmedDtoReq }>()
)

const deleteProfileSosmedAction = createAction(
    '[ProfileSosmed Page] delete profile sosmed',
    props<{ payload: string }>()
)

const deleteProfileSosmedSuccessAction = createAction(
    '[ProfileSosmed Page] delete profile sosmed success',
    props<{ payload: string }>()
)

const insertProfileSosmedAction = createAction(
    '[ProfileSosmed Page] insert profile sosmed',
    props<{ payload: InsertProfileSosmedDtoReq }>()
)

const insertProfileSosmedSuccessAction = createAction(
    '[ProfileSosmed Page] insert profile sosmed success',
    props<{ payload: GetByProfileSosmedIdDtoDataRes }>()
)

export {
    loadProfileSosmedAction, loadProfileSosmedSuccessAction, updateProfileSosmedAction, updateProfileSosmedSuccessAction,
    deleteProfileSosmedAction, deleteProfileSosmedSuccessAction, insertProfileSosmedAction, insertProfileSosmedSuccessAction
}