import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { IndustryListComponent } from "./industry-list/industry-list.component"
import { IndustrySaveComponent } from "./industry-save/industry-save.component"
import { IndustryUpdateComponent } from "./industry-update/industry-update.component"

const routes: Routes = [
    {
        path: 'new',
        component: IndustrySaveComponent
    },
    {
        path: 'list',
        component: IndustryListComponent
    },
    {
        path: ':id',
        component: IndustryUpdateComponent
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
export class IndustryRouter { }