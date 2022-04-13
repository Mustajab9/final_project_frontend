import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { EventTypeListComponent } from "./event-type-list/event-type-list.component"
import { EventTypeSaveComponent } from "./event-type-save/event-type-save.component"
import { EventTypeUpdateComponent } from "./event-type-update/event-type-update.component"

const routes: Routes = [
    {
        path: 'new',
        component: EventTypeSaveComponent
    },
    {
        path: 'list',
        component: EventTypeListComponent
    },
    {
        path: ':id',
        component: EventTypeUpdateComponent
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
export class EventTypeRouter { }