import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { CartCheckoutComponent } from "./cart-checkout.component";
import { CartCheckoutRouter } from "./cart-checkout.router";

@NgModule({
    declarations: [
        CartCheckoutComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        CartCheckoutRouter
    ]
})
export class CartCheckoutModule { }