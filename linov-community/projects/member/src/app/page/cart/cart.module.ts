import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { ButtonModule } from "primeng/button"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { DragDropModule } from "primeng/dragdrop"
import { PanelModule } from 'primeng/panel'
import { TableModule } from 'primeng/table'
import { ToolbarModule } from "primeng/toolbar"

import { CartRouter } from "./cart.router"
import { CartListComponent } from "./cart-list/cart-list.component"
import { CartCheckoutComponent } from "./cart-checkout/cart-checkout.component"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"

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