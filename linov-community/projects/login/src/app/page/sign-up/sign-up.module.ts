import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { UserEffect } from "projects/core/src/app/state/user/user.effect";
import { userReducer } from "projects/core/src/app/state/user/user.reducer";
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
        SignUpRouter,
        StoreModule.forFeature('userStore', userReducer),
        EffectsModule.forFeature([UserEffect])
    ]
})
export class SignUpModule {}