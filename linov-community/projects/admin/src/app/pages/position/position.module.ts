import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PositionListComponent } from "./position-list/position-list.component";
import { PositionSaveComponent } from "./position-save/position-save.component";
import { PositionUpdateComponent } from "./position-update/position-update.component";
import { PositionRouter } from "./position.router";
import { TableModule } from 'primeng/table'
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToolbarModule } from "primeng/toolbar";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ConfirmationService, MessageService } from "primeng/api";
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { PositionEffect } from "../../../../../core/src/app/state/position/position.effect";
import { positionReducer } from "../../../../../core/src/app/state/position/position.reducer";

@NgModule({
    declarations: [
        PositionListComponent,
        PositionSaveComponent,
        PositionUpdateComponent
    ],
    imports: [
        PositionRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('positionStore', positionReducer),
        EffectsModule.forFeature([PositionEffect])
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class PositionModule { }