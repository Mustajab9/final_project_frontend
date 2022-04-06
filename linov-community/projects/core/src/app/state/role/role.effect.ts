import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs'

import { deleteRoleAction, deleteRoleSuccessAction, insertRoleAction, insertRoleSuccessAction, loadRoleAction, loadRoleSuccessAction, updateRoleAction, updateRoleSuccessAction } from './role.action'
import { RoleService } from '../../service/role.service'
import { UpdateRoleDtoReq } from '../../dto/role/update-role-dto-req'
import { GetByRoleIdDtoDataRes } from '../../dto/role/get-by-role-id-dto-data-res'

@Injectable()
export class RoleEffect {
    loadRoleEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadRoleAction),
            mergeMap(
                ({ payload }) => this.roleService.getAll(payload.startPage, payload.maxPage, payload.query).pipe(
                    map(result => loadRoleSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateRoleEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateRoleAction),
            mergeMap(
                ({ payload }) => this.roleService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateRoleDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateRoleSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteRoleEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteRoleAction),
            mergeMap(
                ({ payload }) => this.roleService.delete(payload).pipe(
                    map(result => deleteRoleSuccessAction({ payload }))
                )
            )
        )
    )

    insertRoleEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertRoleAction),
            mergeMap(
                ({ payload }) => this.roleService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByRoleIdDtoDataRes = new GetByRoleIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.roleCode = payload.roleCode
                        newPayload.roleName = payload.roleName
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertRoleSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private roleService: RoleService) { }
}