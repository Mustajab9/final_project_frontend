import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PriceListMemberListComponent } from "./price-list-member-list/price-list-member-list.component";
import { PriceListMemberSaveComponent } from "./price-list-member-save/price-list-member-save.component";
import { PriceListMemberUpdateComponent } from "./price-list-member-update/price-list-member-update.component";
import { PriceListMemberRouter } from "./price-list-member.router";
import { TableModule } from 'primeng/table'
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToolbarModule } from "primeng/toolbar";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ConfirmationService, MessageService } from "primeng/api";
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { priceListMemberReducer } from "../../../../../core/src/app/state/price-list-member/price-list-member.reducer";
import { PriceListMemberEffect } from "../../../../../core/src/app/state/price-list-member/price-list-member.effect";

@NgModule({
    declarations: [
        PriceListMemberListComponent,
        PriceListMemberSaveComponent,
        PriceListMemberUpdateComponent
    ],
    imports: [
        PriceListMemberRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('priceListMemberStore', priceListMemberReducer),
        EffectsModule.forFeature([PriceListMemberEffect])
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class PriceListMemberModule { }