import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { SocialMediaListComponent } from "./social-media-list/social-media-list.component"
import { SocialMediaSaveComponent } from "./social-media-save/social-media-save.component"
import { SocialMediaUpdateComponent } from "./social-media-update/social-media-update.component"

const routes: Routes = [
    {
        path: 'new',
        component: SocialMediaSaveComponent
    },
    {
        path: 'list',
        component: SocialMediaListComponent
    },
    {
        path: ':id',
        component: SocialMediaUpdateComponent
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
export class SocialMediaRouter { }