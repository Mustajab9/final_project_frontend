import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ArticleDashboardComponent } from "./article-dashboard.component";
import { ArticleDashboardRouter } from "./article-dashboard.router";

@NgModule({
    declarations: [
        ArticleDashboardComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        ArticleDashboardRouter
    ]
})
export class ArticleDashboardModule { }