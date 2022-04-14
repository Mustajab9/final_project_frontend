import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleDashboardComponent } from "./article-dashboard/article-dashboard.component";
import { ArticleListComponent } from "./article-list/article-list.component";

const routes: Routes = [
    {
        path: 'article/dashboard',
        component: ArticleDashboardComponent
    },
    {
        path: 'article/list',
        component: ArticleListComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ArticleRouter { }