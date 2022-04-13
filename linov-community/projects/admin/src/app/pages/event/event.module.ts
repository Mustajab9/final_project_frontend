import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { EffectsModule } from "@ngrx/effects"
import { StoreModule } from "@ngrx/store"

import { ConfirmationService } from "primeng/api"
import { ButtonModule } from "primeng/button"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { DialogModule } from "primeng/dialog"
import { TableModule } from "primeng/table"
import { ToolbarModule } from "primeng/toolbar"

import { EventRouter } from "./event.router"
import { EventComponent } from "./event/event.component"
import { ParticipantComponent } from "./participant/participant.component"

import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { EventTypeEffect } from "../../../../../core/src/app/state/event-type/event-type.effect"
import { eventReducer } from "../../../../../core/src/app/state/event/event.reducer"

@NgModule({
    declarations: [
        EventComponent,
        ParticipantComponent
    ],
    imports: [
        EventRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        ToolbarModule,
        DialogModule,
        StoreModule.forFeature('eventStore', eventReducer),
        EffectsModule.forFeature([EventTypeEffect])
    ],
    providers: [
        ConfirmationService
    ]
})
export class EventModule { }