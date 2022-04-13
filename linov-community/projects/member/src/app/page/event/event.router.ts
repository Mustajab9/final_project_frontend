import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventListComponent } from "./event-list/event-list.component";
import { EnrollEventComponent } from "./enroll-event/enroll-event.component";
import { EnrollSaveComponent } from "./enroll-save/enroll-save.component";
import { EventSaveComponent } from "./event-save/event-save.component";
import { ParticipantComponent } from "./participant/participant.component";

const routes: Routes = [
    {
        path: 'enroll',
        component: EnrollEventComponent
    },
    {
        path: 'list',
        component: EventListComponent
    },
    {
        path: 'new',
        component: EventSaveComponent
    },
    {
        path: ':id',
        component: EnrollSaveComponent
    },
    {
        path: 'participant/:type/:id',
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