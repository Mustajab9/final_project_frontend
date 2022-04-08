import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartEnrollComponent } from "./cart-enroll/cart-enroll.component";
import { EnrollEventComponent } from "./enroll-event/enroll-event.component";

const routes: Routes = [
    {
        path: 'enroll-event',
        component: EnrollEventComponent
    },
    {
        path: 'cart-enroll',
        component: CartEnrollComponent
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