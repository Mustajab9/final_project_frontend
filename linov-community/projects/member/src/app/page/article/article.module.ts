import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { ButtonModule } from "primeng/button"

import { ArticleRouter } from "./article.router"
import { ArticleDashboardComponent } from "./article-dashboard/article-dashboard.component"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"

@NgModule({
    declarations: [
        ArticleDashboardComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        ArticleRouter
    ]
})
export class ArticleModule { }