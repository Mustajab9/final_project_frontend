import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ArticleListComponent } from "./article-list.component";
import { ArticleListRouter } from "./article-list.router";

@NgModule({
    declarations: [
        ArticleListComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        ArticleListRouter
    ]
})
export class ArticleListModule { }