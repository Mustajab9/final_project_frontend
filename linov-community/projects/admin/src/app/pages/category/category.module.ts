import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { CategoryListComponent } from "./category-list/category-list.component"
import { CategorySaveComponent } from "./category-save/category-save.component"
import { CategoryUpdateComponent } from "./category-update/category-update.component"
import { CategoryRouter } from "./category.router"
import { TableModule } from 'primeng/table'
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { ButtonModule } from "primeng/button"

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
        TableModule
    ]
})
export class CategoryModule { }