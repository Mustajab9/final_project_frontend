import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { ButtonModule } from "primeng/button"
import { InfiniteScrollModule } from "ngx-infinite-scroll"

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
        InfiniteScrollModule,
        ArticleRouter
    ]
})
export class ArticleModule { }