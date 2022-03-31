import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EventTypeListComponent } from "./event-type-list/event-type-list.component";
import { EventTypeSaveComponent } from "./event-type-save/event-type-save.component";
import { EventTypeUpdateComponent } from "./event-type-update/event-type-update.component";
import { EventTypeRouter } from "./event-type.router";

@NgModule({
    declarations: [
        EventTypeListComponent,
        EventTypeSaveComponent,
        EventTypeUpdateComponent
    ],
    imports: [
        EventTypeRouter,
        CommonModule,
        FormsModule
    ]
})
export class EventTypeModule { }