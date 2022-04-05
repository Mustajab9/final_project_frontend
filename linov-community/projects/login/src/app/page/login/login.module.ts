import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { LoginRouter } from "./login.router";
import {PasswordModule} from 'primeng/password';
import { ComponentModule } from "../../../../../core/src/app/component/components.module";
import { LoginAdminRouter } from "./login-admin.router";

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