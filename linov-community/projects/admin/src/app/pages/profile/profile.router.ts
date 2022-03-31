import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileListComponent } from "./profile-list/profile-list.component";
import { ProfileSaveComponent } from "./profile-save/profile-save.component";
import { ProfileUpdateComponent } from "./profile-update/profile-update.component";

const routes: Routes = [
    {
        path: 'new',
        component: ProfileSaveComponent
    },
    {
        path: 'list',
        component: ProfileListComponent
    },
    {
        path: ':id',
        component: ProfileUpdateComponent
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
export class ProfileRouter { }