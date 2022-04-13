import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { CategoryListComponent } from "./category-list/category-list.component"
import { CategorySaveComponent } from "./category-save/category-save.component"
import { CategoryUpdateComponent } from "./category-update/category-update.component"

const routes: Routes = [
    {
        path: 'new',
        component: CategorySaveComponent
    },
    {
        path: 'list',
        component: CategoryListComponent
    },
    {
        path: ':id',
        component: CategoryUpdateComponent
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
export class CategoryRouter { }