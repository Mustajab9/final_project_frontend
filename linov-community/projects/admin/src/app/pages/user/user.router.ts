import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { UserSaveComponent } from "./user-save/user-save.component";
import { UserUpdateComponent } from "./user-update/user-update.component";

const routes: Routes = [
    {
        path: 'new',
        component: UserSaveComponent
    },
    {
        path: 'list',
        component: UserListComponent
    },
    {
        path: ':id',
        component: UserUpdateComponent
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
export class UserRouter { }