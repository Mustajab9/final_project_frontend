import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { StoreModule } from "@ngrx/store"
import { EffectsModule } from "@ngrx/effects"

import { ConfirmationService, MessageService } from "primeng/api"
import { ButtonModule } from "primeng/button"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { TableModule } from 'primeng/table'
import { ToolbarModule } from "primeng/toolbar"

import { RoleRouter } from "./role.router"
import { RoleListComponent } from "./role-list/role-list.component"
import { RoleSaveComponent } from './role-save/role-save.component'
import { RoleUpdateComponent } from './role-update/role-update.component'

import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { roleReducer } from "../../../../../core/src/app/state/role/role.reducer"
import { RoleEffect } from "../../../../../core/src/app/state/role/role.effect"

@NgModule({
    declarations: [
        RoleListComponent,
        RoleSaveComponent,
        RoleUpdateComponent
    ],
    imports: [
        RoleRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('roleStore', roleReducer),
        EffectsModule.forFeature([RoleEffect])
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class RoleModule { }