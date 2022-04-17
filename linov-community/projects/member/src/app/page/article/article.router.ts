import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { ArticleDashboardComponent } from "./article-dashboard/article-dashboard.component"

const routes: Routes = [
    {
        path: 'article/dashboard',
        component: ArticleDashboardComponent
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