import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { CartListComponent } from "./cart-list.component";
import { CartListRouter } from "./cart-list.router";
import { DragDropModule } from "primeng/dragdrop"
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToolbarModule } from "primeng/toolbar";
import { ConfirmationService } from "primeng/api";

@NgModule({
    declarations: [
        CartListComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        CartListRouter,
        DragDropModule,
        PanelModule,
        TableModule,
        ConfirmDialogModule,
        ToolbarModule,
    ],
    providers: [
        ConfirmationService
    ]
})
export class CartListModule { }