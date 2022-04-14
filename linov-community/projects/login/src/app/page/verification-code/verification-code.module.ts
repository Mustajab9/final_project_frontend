import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { EffectsModule } from "@ngrx/effects"
import { StoreModule } from "@ngrx/store"

import { VerificationCodeRouter } from "./verification-code.router"
import { VerificationCodeComponent } from "./verification-code.component"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { UserEffect } from "../../../../../core/src/app/state/user/user.effect"
import { userReducer } from "../../../../../core/src/app/state/user/user.reducer"

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