import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { DashboardRouter } from "./dashboard.router"
import { DashboardComponent } from "./dashboard.component"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        DashboardRouter,
        CommonModule,
        FormsModule,
        ComponentModule
    ]
})
export class DashboardModule { }