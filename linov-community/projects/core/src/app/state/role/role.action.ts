import { createAction, props } from '@ngrx/store'

import { UpdateRoleDtoReq } from '../../dto/role/update-role-dto-req'
import { GetAllRoleDtoDataRes } from '../../dto/role/get-all-role-dto-data-res'
import { InsertRoleDtoReq } from '../../dto/role/insert-role-dto-req'
import { GetByRoleIdDtoDataRes } from '../../dto/role/get-by-role-id-dto-data-res'

const loadRoleAction = createAction(
    '[Role Page] load role',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadRoleSuccessAction = createAction(
    '[Role Page] load role success',
    props<{ payload: GetAllRoleDtoDataRes[] }>()
)

const updateRoleAction = createAction(
    '[Role Page] update role',
    props<{ payload: UpdateRoleDtoReq }>()
)

const updateRoleSuccessAction = createAction(
    '[Role Page] update role success',
    props<{ payload: UpdateRoleDtoReq }>()
)

const deleteRoleAction = createAction(
    '[Role Page] delete role',
    props<{ payload: string }>()
)

const deleteRoleSuccessAction = createAction(
    '[Role Page] delete role success',
    props<{ payload: string }>()
)

const insertRoleAction = createAction(
    '[Role Page] insert role',
    props<{ payload: InsertRoleDtoReq }>()
)

const insertRoleSuccessAction = createAction(
    '[Role Page] insert role success',
    props<{ payload: GetByRoleIdDtoDataRes }>()
)

export {
    loadRoleAction, loadRoleSuccessAction, updateRoleAction, updateRoleSuccessAction,
    deleteRoleAction, deleteRoleSuccessAction, insertRoleAction, insertRoleSuccessAction
}