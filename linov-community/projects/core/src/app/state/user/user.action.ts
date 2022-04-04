import { createAction, props } from '@ngrx/store'

import { UpdateUserDtoReq } from '../../dto/user/update-user-dto-req'
import { GetAllUserDtoDataRes } from '../../dto/user/get-all-user-dto-data-res'
import { InsertUserDtoReq } from '../../dto/user/insert-user-dto-req'
import { GetByUserIdDtoDataRes } from '../../dto/user/get-by-user-id-dto-data-res'

const loadUserAction = createAction(
    '[User Page] load user',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadUserSuccessAction = createAction(
    '[User Page] load user success',
    props<{ payload: GetAllUserDtoDataRes[] }>()
)

const updateUserAction = createAction(
    '[User Page] update user',
    props<{ payload: UpdateUserDtoReq }>()
)

const updateUserSuccessAction = createAction(
    '[User Page] update user success',
    props<{ payload: UpdateUserDtoReq }>()
)

const deleteUserAction = createAction(
    '[User Page] delete user',
    props<{ payload: string }>()
)

const deleteUserSuccessAction = createAction(
    '[User Page] delete user success',
    props<{ payload: string }>()
)

const insertUserAction = createAction(
    '[User Page] insert user',
    props<{ payload: InsertUserDtoReq }>()
)

const insertUserSuccessAction = createAction(
    '[User Page] insert user success',
    props<{ payload: GetByUserIdDtoDataRes }>()
)

export {
    loadUserAction, loadUserSuccessAction, updateUserAction, updateUserSuccessAction,
    deleteUserAction, deleteUserSuccessAction, insertUserAction, insertUserSuccessAction
}