import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { PriceListEventListComponent } from "./price-list-event-list/price-list-event-list.component"
import { PriceListEventSaveComponent } from "./price-list-event-save/price-list-event-save.component"
import { PriceListEventUpdateComponent } from "./price-list-event-update/price-list-event-update.component"

const routes: Routes = [
    {
        path: 'new',
        component: PriceListEventSaveComponent
    },
    {
        path: 'list',
        component: PriceListEventListComponent
    },
    {
        path: ':id',
        component: PriceListEventUpdateComponent
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
export class PriceListEventRouter { }