import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ChangePasswordComponent } from "./change-password.component";
import { ChangePasswordRouter } from "./change-password.router";

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