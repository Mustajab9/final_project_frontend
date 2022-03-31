import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { LoginRouter } from "./login.router";
import {PasswordModule} from 'primeng/password';
import { ComponentModule } from "projects/core/src/app/component/components.module";

@NgModule({
    declarations : [
        LoginComponent
    ],
    imports : [
        ComponentModule,
        CommonModule,
        FormsModule,
        PasswordModule,
        LoginRouter
    ]
})
export class LoginModule {}