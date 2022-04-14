import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import {PasswordModule} from 'primeng/password'

import { LoginRouter } from "./login.router"
import { LoginAdminRouter } from "./login-admin.router"
import { LoginComponent } from "./login.component"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"

@NgModule({
    declarations : [
        LoginComponent
    ],
    imports : [
        ComponentModule,
        CommonModule,
        FormsModule,
        PasswordModule,
        LoginRouter,
        LoginAdminRouter
    ]
})
export class LoginModule {}