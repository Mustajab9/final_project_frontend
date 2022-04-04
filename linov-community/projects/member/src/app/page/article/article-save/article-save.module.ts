import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ArticleSaveComponent } from "./article-save.component";
import { ArticleSaveRouter } from "./article-save.router";

@NgModule({
    declarations: [
        ArticleSaveComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        ArticleSaveRouter
    ]
})
export class ArticleSaveModule { }