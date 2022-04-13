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

import { ThreadTypeRouter } from "./thread-type.router"
import { ThreadTypeListComponent } from "./thread-type-list/thread-type-list.component"
import { ThreadTypeSaveComponent } from "./thread-type-save/thread-type-save.component"
import { ThreadTypeUpdateComponent } from "./thread-type-update/thread-type-update.component"

import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { threadTypeReducer } from "../../../../../core/src/app/state/thread-type/thread-type.reducer"
import { ThreadTypeEffect } from "../../../../../core/src/app/state/thread-type/thread-type.effect"

@NgModule({
    declarations: [
        ThreadTypeListComponent,
        ThreadTypeSaveComponent,
        ThreadTypeUpdateComponent
    ],
    imports: [
        ThreadTypeRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('threadTypeStore', threadTypeReducer),
        EffectsModule.forFeature([ThreadTypeEffect])
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class ThreadTypeModule { }