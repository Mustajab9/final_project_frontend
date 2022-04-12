import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { UserEffect } from "projects/core/src/app/state/user/user.effect";
import { userReducer } from "projects/core/src/app/state/user/user.reducer";
import { VerificationCodeComponent } from "./verification-code.component";
import { VerificationCodeRouter } from "./verification-code.router";

@NgModule({
    declarations: [
        VerificationCodeComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        VerificationCodeRouter,
        StoreModule.forFeature('userStore', userReducer),
        EffectsModule.forFeature([UserEffect])
    ]
})
export class VerificationCodeModule { }