import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { StoreModule } from "@ngrx/store"
import { EffectsModule } from "@ngrx/effects"

import { ConfirmationService } from "primeng/api"
import { ButtonModule } from "primeng/button"
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { TableModule } from 'primeng/table'
import { ToolbarModule } from 'primeng/toolbar'

import { CategoryRouter } from "./category.router"
import { CategoryListComponent } from "./category-list/category-list.component"
import { CategorySaveComponent } from "./category-save/category-save.component"
import { CategoryUpdateComponent } from "./category-update/category-update.component"

import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { categoryReducer } from "../../../../../core/src/app/state/category/category.reducer"
import { CategoryEffect } from "../../../../../core/src/app/state/category/category.effect"

@NgModule({
    declarations: [
        CategoryListComponent,
        CategorySaveComponent,
        CategoryUpdateComponent
    ],
    imports: [
        CategoryRouter,
        CommonModule,
        FormsModule,
        ButtonModule,
        ComponentModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('categoryStore', categoryReducer),
        EffectsModule.forFeature([CategoryEffect])
    ],
    providers: [
        ConfirmationService
    ]
})
export class CategoryModule { }