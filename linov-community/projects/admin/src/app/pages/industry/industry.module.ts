import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IndustryListComponent } from "./industry-list/industry-list.component";
import { IndustrySaveComponent } from "./industry-save/industry-save.component";
import { IndustryUpdateComponent } from "./industry-update/industry-update.component";
import { IndustryRouter } from "./industry.router";
import { TableModule } from 'primeng/table'
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToolbarModule } from "primeng/toolbar";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ConfirmationService, MessageService } from "primeng/api";
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { industryReducer } from "../../../../../core/src/app/state/industry/industry.reducer";
import { IndustryEffect } from "../../../../../core/src/app/state/industry/industry.effect";

@NgModule({
    declarations: [
        IndustryListComponent,
        IndustrySaveComponent,
        IndustryUpdateComponent
    ],
    imports: [
        IndustryRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('industryStore', industryReducer),
        EffectsModule.forFeature([IndustryEffect])
    ],
    providers: [
        ConfirmationService
    ]
})
export class IndustryModule { }