import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProvinceListComponent } from "./province-list/province-list.component";
import { ProvinceSaveComponent } from "./province-save/province-save.component";
import { ProvinceUpdateComponent } from "./province-update/province-update.component";
import { ProvinceRouter } from "./province.router";
import { TableModule } from 'primeng/table'
import { ComponentModule } from "../../../../../core/src/app/component/components.module"

@NgModule({
    declarations: [
        ProvinceListComponent,
        ProvinceSaveComponent,
        ProvinceUpdateComponent
    ],
    imports: [
        ProvinceRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule
    ]
})
export class ProvinceModule { }