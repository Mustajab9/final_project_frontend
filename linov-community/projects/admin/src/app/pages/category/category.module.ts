import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategorySaveComponent } from "./category-save/category-save.component";
import { CategoryUpdateComponent } from "./category-update/category-update.component";
import { CategoryRouter } from "./category.router";

@NgModule({
    declarations: [
        CategoryListComponent,
        CategorySaveComponent,
        CategoryUpdateComponent
    ],
    imports: [
        CategoryRouter,
        CommonModule,
        FormsModule
    ]
})
export class CategoryModule { }