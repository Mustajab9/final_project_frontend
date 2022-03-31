import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ComponentModule } from "../../component/components.module";
import { SignUpComponent } from "./sign-up.component";
import { SignUpRouter } from "./sign-up.router";


@NgModule({
    declarations : [
        SignUpComponent
    ],
    imports : [
        ComponentModule,
        CommonModule,
        FormsModule,
        SignUpRouter
    ]
})
export class SignUpModule {}