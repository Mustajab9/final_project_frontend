import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreadDetailComponent } from "./thread-detail/thread-detail.component";
import { ThreadComponent } from "./thread-profile/thread.component";
import { ThreadSaveComponent } from "./thread-save/thread-save.component";

const routes : Routes = [
    {
        path : '',
        component : ThreadComponent
    },
    {
        path : 'detail',
        component : ThreadDetailComponent
    },
    {
        path : 'save',
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