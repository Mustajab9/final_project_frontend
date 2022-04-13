import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRouter } from "./dashboard.router";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ButtonModule } from "primeng/button";
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { CarouselModule } from 'primeng/carousel';
import { ProgressBarModule } from 'primeng/progressbar';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { PanelModule } from 'primeng/panel';
import { BlockUIModule } from 'primeng/blockui';
import { ConfirmationService } from "primeng/api";

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
        DashboardRouter,
    ],
    providers: [
        ConfirmationService
    ]
})
export class DashboardModule { }