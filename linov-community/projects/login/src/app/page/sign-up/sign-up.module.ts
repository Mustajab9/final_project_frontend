import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { StoreModule } from "@ngrx/store"
import { EffectsModule } from "@ngrx/effects"

import { SignUpRouter } from "./sign-up.router"
import { SignUpComponent } from "./sign-up.component"
import { UserEffect } from "../../../../../core/src/app/state/user/user.effect"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { userReducer } from "../../../../../core/src/app/state/user/user.reducer"

@NgModule({
    declarations : [
        SignUpComponent
    ],
    imports : [
        ComponentModule,
        CommonModule,
        FormsModule,
        SignUpRouter,
        StoreModule.forFeature('userStore', userReducer),
        EffectsModule.forFeature([UserEffect])
    ]
})
export class SignUpModule {}