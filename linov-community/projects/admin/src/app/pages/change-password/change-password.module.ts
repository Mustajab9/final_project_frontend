import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { ChangePasswordRouter } from "./change-password.router"
import { ChangePasswordComponent } from "./change-password.component"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"

@NgModule({
    declarations: [
        ChangePasswordComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ChangePasswordRouter
    ]
})
export class ChangePasswordModule { }