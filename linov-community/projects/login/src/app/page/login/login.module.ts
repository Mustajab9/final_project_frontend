import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ComponentModule } from "../../component/components.module";
import { LoginComponent } from "./login.component";
import { LoginRouter } from "./login.router";
import {PasswordModule} from 'primeng/password';

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