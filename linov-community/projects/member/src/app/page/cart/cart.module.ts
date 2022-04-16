import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { DragDropModule } from "primeng/dragdrop"
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToolbarModule } from "primeng/toolbar";
import { ConfirmationService } from "primeng/api";
import { CartCheckoutComponent } from "./cart-checkout/cart-checkout.component";
import { CartListComponent } from "./cart-list/cart-list.component";
import { CartRouter } from "./cart.router";

@NgModule({
    declarations: [
        CartCheckoutComponent, CartListComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        DragDropModule,
        PanelModule,
        TableModule,
        ConfirmDialogModule,
        ToolbarModule,
        CartRouter
    ]
})
export class CartModule { }