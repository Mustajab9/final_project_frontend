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

import { ProvinceRouter } from "./province.router"
import { ProvinceListComponent } from "./province-list/province-list.component"
import { ProvinceSaveComponent } from "./province-save/province-save.component"
import { ProvinceUpdateComponent } from "./province-update/province-update.component"

import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { ProvinceEffect } from "../../../../../core/src/app/state/province/province.effect"
import { provinceReducer } from "../../../../../core/src/app/state/province/province.reducer"

@NgModule({
    declarations: [
        ProvinceListComponent,
        ProvinceSaveComponent,
        ProvinceUpdateComponent
    ],
    imports: [
        ProvinceRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('provinceStore', provinceReducer),
        EffectsModule.forFeature([ProvinceEffect])
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class ProvinceModule { }