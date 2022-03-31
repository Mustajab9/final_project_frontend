import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreadTypeListComponent } from "./thread-type-list/thread-type-list.component";
import { ThreadTypeSaveComponent } from "./thread-type-save/thread-type-save.component";
import { ThreadTypeUpdateComponent } from "./thread-type-update/thread-type-update.component";

const routes: Routes = [
    {
        path: 'new',
        component: ThreadTypeSaveComponent
    },
    {
        path: 'list',
        component: ThreadTypeListComponent
    },
    {
        path: ':id',
        component: ThreadTypeUpdateComponent
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
export class ThreadTypeRouter { }