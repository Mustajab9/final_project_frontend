import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleDashboardComponent } from "./article-dashboard.component";

const routes : Routes = [
    {
        path : '',
        component : ArticleDashboardComponent
    }
]

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class ArticleDashboardRouter {}