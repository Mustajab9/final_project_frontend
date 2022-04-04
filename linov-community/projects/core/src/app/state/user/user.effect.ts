import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap, Observable } from 'rxjs'

import { deleteUserAction, deleteUserSuccessAction, insertUserAction, insertUserSuccessAction, loadUserAction, loadUserSuccessAction, updateUserAction, updateUserSuccessAction } from './user.action'
import { UserService } from '../../service/user.service'
import { UpdateUserDtoReq } from '../../dto/user/update-user-dto-req'
import { GetByUserIdDtoDataRes } from '../../dto/user/get-by-user-id-dto-data-res'
import { RoleService } from '../../service/role.service'
import { GetByRoleIdDtoRes } from '../../dto/role/get-by-role-id-dto-res'

@Injectable()
export class UserEffect {
    loadUserEffect = createEffect(() =>
        this.action$.pipe(
            ofType(loadUserAction),
            mergeMap(
                ({ payload }) => this.userService.getAll(payload.query, payload.startPage, payload.maxPage).pipe(
                    map(result => loadUserSuccessAction({ payload: result.data }))
                )
            )
        )
    )

    updateUserEffect = createEffect(() =>
        this.action$.pipe(
            ofType(updateUserAction),
            mergeMap(
                ({ payload }) => this.userService.update(payload).pipe(
                    map(result => {
                        const newPayload: UpdateUserDtoReq = { ...payload }
                        newPayload.version = result.data.version
                        return updateUserSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    deleteUserEffect = createEffect(() =>
        this.action$.pipe(
            ofType(deleteUserAction),
            mergeMap(
                ({ payload }) => this.userService.delete(payload).pipe(
                    map(result => deleteUserSuccessAction({ payload }))
                )
            )
        )
    )

    insertUserEffect = createEffect(() =>
        this.action$.pipe(
            ofType(insertUserAction),
            mergeMap(
                ({ payload }) => this.userService.insert(payload).pipe(
                    map(result => {
                        const newPayload: GetByUserIdDtoDataRes = new GetByUserIdDtoDataRes()
                        newPayload.id = result.data.id
                        newPayload.username = payload.username
                        const dataRole: Observable<GetByRoleIdDtoRes> = this.roleService.getById(payload.roleId)
                        dataRole.pipe(map(result => {
                            newPayload.roleName = result.data?.roleName
                        }))
                        newPayload.version = 0
                        newPayload.isActive = true
                        return insertUserSuccessAction({ payload: newPayload })
                    })
                )
            )
        )
    )

    constructor(private action$: Actions, private userService: UserService, private roleService: RoleService) { }
}