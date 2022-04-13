import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { EventComponent } from "./event/event.component"
import { ParticipantComponent } from "./participant/participant.component"

const routes: Routes = [
    {
        path: 'list',
        component: EventComponent
    },
    {
        path: 'participant/:id',
        component: ParticipantComponent
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
export class EventRouter { }