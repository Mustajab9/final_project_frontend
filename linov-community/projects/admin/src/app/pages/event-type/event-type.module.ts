import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { StoreModule } from "@ngrx/store"
import { EffectsModule } from "@ngrx/effects"

import { ConfirmationService } from "primeng/api"
import { ButtonModule } from "primeng/button"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { TableModule } from 'primeng/table'
import { ToolbarModule } from "primeng/toolbar"

import { EventTypeRouter } from "./event-type.router"
import { EventTypeListComponent } from "./event-type-list/event-type-list.component"
import { EventTypeSaveComponent } from "./event-type-save/event-type-save.component"
import { EventTypeUpdateComponent } from "./event-type-update/event-type-update.component"

import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { eventTypeReducer } from "../../../../../core/src/app/state/event-type/event-type.reducer"
import { EventTypeEffect } from "../../../../../core/src/app/state/event-type/event-type.effect"

@NgModule({
    declarations: [
        EventTypeListComponent,
        EventTypeSaveComponent,
        EventTypeUpdateComponent
    ],
    imports: [
        EventTypeRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('eventTypeStore', eventTypeReducer),
        EffectsModule.forFeature([EventTypeEffect])
    ],
    providers: [
        ConfirmationService
    ]
})
export class EventTypeModule { }