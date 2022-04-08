import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ChangePasswordAdminRouter } from "./change-password-admin.router";
import { ChangePasswordComponent } from "./change-password.component";
import { ChangePasswordRouter } from "./change-password.router";

@NgModule({
    declarations : [
        ChangePasswordComponent
    ],
    imports : [
        ComponentModule,
        CommonModule,
        FormsModule,
        ChangePasswordRouter,
        ChangePasswordAdminRouter
    ]
})
export class ChangePasswordModule {}