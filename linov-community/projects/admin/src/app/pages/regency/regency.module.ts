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

import { RegencyRouter } from "./regency.router"
import { RegencyListComponent } from "./regency-list/regency-list.component"
import { RegencySaveComponent } from "./regency-save/regency-save.component"
import { RegencyUpdateComponent } from "./regency-update/regency-update.component"

import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { regencyReducer } from "../../../../../core/src/app/state/regency/regency.reducer"
import { RegencyEffect } from "../../../../../core/src/app/state/regency/regency.effect"

@NgModule({
    declarations: [
        RegencyListComponent,
        RegencySaveComponent,
        RegencyUpdateComponent
    ],
    imports: [
        RegencyRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('regencyStore', regencyReducer),
        EffectsModule.forFeature([RegencyEffect])
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class RegencyModule { }