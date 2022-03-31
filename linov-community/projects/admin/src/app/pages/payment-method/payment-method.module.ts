import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PaymentMethodListComponent } from "./payment-method-list/payment-method-list.component";
import { PaymentMethodSaveComponent } from "./payment-method-save/payment-method-save.component";
import { PaymentMethodUpdateComponent } from "./payment-method-update/payment-method-update.component";
import { PaymentMethodRouter } from "./payment-method.router";

@NgModule({
    declarations: [
        PaymentMethodListComponent,
        PaymentMethodSaveComponent,
        PaymentMethodUpdateComponent
    ],
    imports: [
        PaymentMethodRouter,
        CommonModule,
        FormsModule
    ]
})
export class PaymentMethodModule { }