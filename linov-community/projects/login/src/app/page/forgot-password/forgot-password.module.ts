import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { ForgotPasswordRouter } from "./forgot-password.router";

@NgModule({
    declarations : [
        ForgotPasswordComponent
    ],
    imports : [
        ComponentModule,
        CommonModule,
        FormsModule,
        ForgotPasswordRouter
    ]
})
export class ForgotPasswordModule {}