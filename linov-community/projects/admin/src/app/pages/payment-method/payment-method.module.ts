import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { StoreModule } from "@ngrx/store"
import { EffectsModule } from "@ngrx/effects"

import { ConfirmationService } from "primeng/api"
import { ButtonModule } from "primeng/button"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { TableModule } from 'primeng/table'
import { ToolbarModule } from "primeng/toolbar"

import { PaymentMethodRouter } from "./payment-method.router"
import { PaymentMethodListComponent } from "./payment-method-list/payment-method-list.component"
import { PaymentMethodSaveComponent } from "./payment-method-save/payment-method-save.component"
import { PaymentMethodUpdateComponent } from "./payment-method-update/payment-method-update.component"

import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { paymentMethodReducer } from "../../../../../core/src/app/state/payment-method/payment-method.reducer"
import { PaymentMethodEffect } from "../../../../../core/src/app/state/payment-method/payment-method.effect"

@NgModule({
    declarations: [
        PaymentMethodListComponent,
        PaymentMethodSaveComponent,
        PaymentMethodUpdateComponent
    ],
    imports: [
        PaymentMethodRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('paymentMethodStore', paymentMethodReducer),
        EffectsModule.forFeature([PaymentMethodEffect])
    ],
    providers: [
        ConfirmationService
    ]
})
export class PaymentMethodModule { }