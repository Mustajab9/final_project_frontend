import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileListComponent } from "./profile-list/profile-list.component";

const routes: Routes = [
    {
        path: 'list',
        component: ProfileListComponent
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