import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRouter } from "./dashboard.router";
import { TabViewModule } from 'primeng/tabview';

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
        DashboardRouter
    ]
})
export class DashboardModule { }