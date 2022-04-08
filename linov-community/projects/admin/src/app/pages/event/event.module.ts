import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ConfirmationService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { EventComponent } from "./event.component";
import { EventRouter } from "./event.router";

@NgModule({
    declarations: [
        EventComponent
    ],
    imports: [
        EventRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule
        // StoreModule.forFeature('eventStore', eventReducer),
        // EffectsModule.forFeature([EventTypeEffect])
    ],
    providers: [
        ConfirmationService
    ]
})
export class EventModule { }