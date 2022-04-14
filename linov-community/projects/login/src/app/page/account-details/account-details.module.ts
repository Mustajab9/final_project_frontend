import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { EffectsModule } from "@ngrx/effects"
import { StoreModule } from "@ngrx/store"

import { DropdownModule } from "primeng/dropdown"

import { AccountDetailsRouter } from "./account-details.router"
import { AccountDetailsComponent } from "./account-details.component"

import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { ProfilesEffect } from "../../../../../core/src/app/state/profiles/profiles.effect"
import { profilesReducer } from "../../../../../core/src/app/state/profiles/profiles.reducer"

@NgModule({
    declarations : [
        AccountDetailsComponent
    ],
    imports : [
        ComponentModule,
        CommonModule,
        FormsModule,
        AccountDetailsRouter,
        DropdownModule,
        StoreModule.forFeature('profilesStore', profilesReducer),
        EffectsModule.forFeature([ProfilesEffect])
    ]
})
export class AccountDetailsModule {}