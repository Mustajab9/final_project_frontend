import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { RoleListComponent } from "./role-list/role-list.component"
import { RoleSaveComponent } from "./role-save/role-save.component"
import { RoleUpdateComponent } from "./role-update/role-update.component"

const routes: Routes = [
    {
        path: 'new',
        component: RoleSaveComponent
    },
    {
        path: 'list',
        component: RoleListComponent
    },
    {
        path: ':id',
        component: RoleUpdateComponent
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
export class RoleRouter { }