import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRouter } from "./dashboard.router";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        DashboardRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule
    ]
})
export class DashboardModule { }