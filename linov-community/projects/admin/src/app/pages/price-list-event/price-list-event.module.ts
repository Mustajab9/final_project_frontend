import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PriceListEventListComponent } from "./price-list-event-list/price-list-event-list.component";
import { PriceListEventSaveComponent } from "./price-list-event-save/price-list-event-save.component";
import { PriceListEventUpdateComponent } from "./price-list-event-update/price-list-event-update.component";
import { PriceListEventRouter } from "./price-list-event.router";
import { TableModule } from 'primeng/table'
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { ButtonModule } from "primeng/button";

@NgModule({
    declarations: [
        PriceListEventListComponent,
        PriceListEventSaveComponent,
        PriceListEventUpdateComponent
    ],
    imports: [
        PriceListEventRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule
    ]
})
export class PriceListEventModule { }