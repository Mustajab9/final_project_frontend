import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EventRouter } from "./event.router";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ButtonModule } from "primeng/button";
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { ListboxModule } from 'primeng/listbox';
import { ToolbarModule } from "primeng/toolbar";
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { EnrollEventComponent } from './enroll-event/enroll-event.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventSaveComponent } from './event-save/event-save.component';
import { EnrollSaveComponent } from './enroll-save/enroll-save.component';
import { TableModule } from "primeng/table";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ConfirmationService } from "primeng/api";
import { eventReducer } from "projects/core/src/app/state/event/event.reducer";
import { ParticipantComponent } from './participant/participant.component';
import { EventEffect } from "projects/core/src/app/state/event/event.effect";

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
        DialogModule,
        TableModule,
        ConfirmDialogModule,
        StoreModule.forFeature('eventStore', eventReducer),
        EffectsModule.forFeature([EventEffect])
    ],
    providers: [
        ConfirmationService
    ]
})
export class EventModule { }