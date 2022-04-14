import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { ForgotPasswordRouter } from "./forgot-password.router"
import { ForgotPasswordComponent } from "./forgot-password.component"

import { ComponentModule } from "../../../../../core/src/app/component/components.module"

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