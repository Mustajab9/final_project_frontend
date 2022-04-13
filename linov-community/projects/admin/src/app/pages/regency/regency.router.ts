import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { RegencyListComponent } from "./regency-list/regency-list.component"
import { RegencySaveComponent } from "./regency-save/regency-save.component"
import { RegencyUpdateComponent } from "./regency-update/regency-update.component"

const routes: Routes = [
    {
        path: 'new',
        component: RegencySaveComponent
    },
    {
        path: 'list',
        component: RegencyListComponent
    },
    {
        path: ':id',
        component: RegencyUpdateComponent
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
export class RegencyRouter { }