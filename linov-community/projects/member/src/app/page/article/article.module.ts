import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ArticleDashboardComponent } from "./article-dashboard/article-dashboard.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleRouter } from "./article.router";

@NgModule({
    declarations: [
        ArticleDashboardComponent, ArticleListComponent
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