import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRouter } from "./dashboard.router";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ButtonModule } from "primeng/button";
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';

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
        DashboardRouter
    ]
})
export class DashboardModule { }