import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleSaveComponent } from "./article-save.component";

const routes : Routes = [
    {
        path : '',
        component : ArticleSaveComponent
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
export class ArticleSaveRouter {}