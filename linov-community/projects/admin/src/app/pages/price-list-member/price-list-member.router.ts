import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PriceListMemberListComponent } from "./price-list-member-list/price-list-member-list.component";
import { PriceListMemberSaveComponent } from "./price-list-member-save/price-list-member-save.component";
import { PriceListMemberUpdateComponent } from "./price-list-member-update/price-list-member-update.component";

const routes: Routes = [
    {
        path: 'new',
        component: PriceListMemberSaveComponent
    },
    {
        path: 'list',
        component: PriceListMemberListComponent
    },
    {
        path: ':id',
        component: PriceListMemberUpdateComponent
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
export class PriceListMemberRouter { }