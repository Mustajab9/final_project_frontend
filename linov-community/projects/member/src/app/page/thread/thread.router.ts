import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreadDetailComponent } from "./thread-detail/thread-detail.component";
import { ThreadComponent } from "./thread-profile/thread.component";
import { ThreadSaveComponent } from "./thread-save/thread-save.component";

const routes : Routes = [
    {
        path : 'thread',
        component : ThreadComponent
    },
    {
        path : 'thread/detail/:id',
        component : ThreadDetailComponent
    },
    {
        path : 'thread/save/:type',
        component : ThreadSaveComponent
    }
]

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class ThreadRouter {}