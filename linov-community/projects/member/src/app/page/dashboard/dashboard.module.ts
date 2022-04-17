import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { InfiniteScrollModule } from "ngx-infinite-scroll"

import { ConfirmationService } from "primeng/api"
import { ButtonModule } from "primeng/button"
import { BlockUIModule } from 'primeng/blockui'
import { ChartModule } from 'primeng/chart'
import { CarouselModule } from 'primeng/carousel'
import { PanelModule } from 'primeng/panel'
import { ProgressBarModule } from 'primeng/progressbar'
import { TabViewModule } from 'primeng/tabview'
import { ListboxModule } from 'primeng/listbox'

import { DashboardRouter } from "./dashboard.router"
import { DashboardComponent } from "./dashboard.component"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        TabViewModule,
        ChartModule,
        CarouselModule,
        ProgressBarModule,
        InfiniteScrollModule,
        PanelModule,
        BlockUIModule,
        ListboxModule,
        DashboardRouter,
    ],
    providers: [
        ConfirmationService
    ]
})
export class DashboardModule { }