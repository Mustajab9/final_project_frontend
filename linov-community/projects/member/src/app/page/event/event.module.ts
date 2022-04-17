import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { StoreModule } from "@ngrx/store"
import { EffectsModule } from "@ngrx/effects"

import { ConfirmationService } from "primeng/api"
import { ButtonModule } from "primeng/button"
import { ChartModule } from 'primeng/chart'
import { CalendarModule } from 'primeng/calendar'
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { DialogModule } from 'primeng/dialog'
import { FileUploadModule } from 'primeng/fileupload'
import { ListboxModule } from 'primeng/listbox'
import { TableModule } from "primeng/table"
import { TabViewModule } from 'primeng/tabview'
import { ToolbarModule } from "primeng/toolbar"

import { EventRouter } from "./event.router"
import { EnrollEventComponent } from './enroll-event/enroll-event.component'
import { EventListComponent } from './event-list/event-list.component'
import { EventSaveComponent } from './event-save/event-save.component'
import { EnrollSaveComponent } from './enroll-save/enroll-save.component'
import { ParticipantComponent } from './participant/participant.component'

import { eventReducer } from "../../../../../core/src/app/state/event/event.reducer"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { EventEffect } from "../../../../../core/src/app/state/event/event.effect"

@NgModule({
    declarations: [
        EnrollEventComponent,
        EventListComponent,
        EventSaveComponent,
        EnrollSaveComponent,
        ParticipantComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        CalendarModule,
        FormsModule,
        FileUploadModule,
        ButtonModule,
        TabViewModule,
        ChartModule,
        ListboxModule,
        EventRouter,
        ToolbarModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        StoreModule.forFeature('eventStore', eventReducer),
        EffectsModule.forFeature([EventEffect])
    ],
    providers: [
        ConfirmationService
    ]
})
export class EventModule { }