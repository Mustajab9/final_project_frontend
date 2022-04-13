import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ConfirmationService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { EventTypeEffect } from "projects/core/src/app/state/event-type/event-type.effect";
import { eventReducer } from "projects/core/src/app/state/event/event.reducer";
import { EventComponent } from "./event/event.component";
import { EventRouter } from "./event.router";
import { ParticipantComponent } from "./participant/participant.component";
import { DialogModule } from "primeng/dialog";

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