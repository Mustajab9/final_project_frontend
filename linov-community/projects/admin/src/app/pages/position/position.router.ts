import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { PositionListComponent } from "./position-list/position-list.component"
import { PositionSaveComponent } from "./position-save/position-save.component"
import { PositionUpdateComponent } from "./position-update/position-update.component"

const routes: Routes = [
    {
        path: 'new',
        component: PositionSaveComponent
    },
    {
        path: 'list',
        component: PositionListComponent
    },
    {
        path: ':id',
        component: PositionUpdateComponent
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
export class PositionRouter { }