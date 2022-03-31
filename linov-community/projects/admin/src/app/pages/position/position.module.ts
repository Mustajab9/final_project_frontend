import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PositionListComponent } from "./position-list/position-list.component";
import { PositionSaveComponent } from "./position-save/position-save.component";
import { PositionUpdateComponent } from "./position-update/position-update.component";
import { PositionRouter } from "./position.router";

@NgModule({
    declarations: [
        PositionListComponent,
        PositionSaveComponent,
        PositionUpdateComponent
    ],
    imports: [
        PositionRouter,
        CommonModule,
        FormsModule
    ]
})
export class PositionModule { }