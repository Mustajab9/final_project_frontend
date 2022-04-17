import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { ButtonModule } from "primeng/button"
import { TabViewModule } from "primeng/tabview"

import { SubscriptionRouter } from "./subscription.router"
import { SubscriptionComponent } from "./subscription.component"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"

@NgModule({
    declarations: [
        SubscriptionComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        TabViewModule,
        SubscriptionRouter
    ]
})
export class SubscriptionModule { }