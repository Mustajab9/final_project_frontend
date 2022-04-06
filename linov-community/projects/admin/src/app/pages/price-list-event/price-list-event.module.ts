import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PriceListEventListComponent } from "./price-list-event-list/price-list-event-list.component";
import { PriceListEventSaveComponent } from "./price-list-event-save/price-list-event-save.component";
import { PriceListEventUpdateComponent } from "./price-list-event-update/price-list-event-update.component";
import { PriceListEventRouter } from "./price-list-event.router";
import { TableModule } from 'primeng/table'
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToolbarModule } from "primeng/toolbar";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ConfirmationService, MessageService } from "primeng/api";
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { priceListEventReducer } from "../../../../../core/src/app/state/price-list-event/price-list-event.reducer";
import { PriceListEventEffect } from "../../../../../core/src/app/state/price-list-event/price-list-event.effect";

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
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('priceListEventStore', priceListEventReducer),
        EffectsModule.forFeature([PriceListEventEffect])
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class PriceListEventModule { }