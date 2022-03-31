import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProvinceListComponent } from "./province-list/province-list.component";
import { ProvinceSaveComponent } from "./province-save/province-save.component";
import { ProvinceUpdateComponent } from "./province-update/province-update.component";

const routes: Routes = [
    {
        path: 'new',
        component: ProvinceSaveComponent
    },
    {
        path: 'list',
        component: ProvinceListComponent
    },
    {
        path: ':id',
        component: ProvinceUpdateComponent
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
export class ProvinceRouter { }