import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EventTypeListComponent } from "./event-type-list/event-type-list.component";
import { EventTypeSaveComponent } from "./event-type-save/event-type-save.component";
import { EventTypeUpdateComponent } from "./event-type-update/event-type-update.component";
import { EventTypeRouter } from "./event-type.router";
import { TableModule } from 'primeng/table'
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { ButtonModule } from "primeng/button";

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
        ButtonModule
    ]
})
export class EventTypeModule { }