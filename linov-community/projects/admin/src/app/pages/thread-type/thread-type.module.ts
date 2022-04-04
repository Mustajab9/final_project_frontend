import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ThreadTypeListComponent } from "./thread-type-list/thread-type-list.component";
import { ThreadTypeSaveComponent } from "./thread-type-save/thread-type-save.component";
import { ThreadTypeUpdateComponent } from "./thread-type-update/thread-type-update.component";
import { ThreadTypeRouter } from "./thread-type.router";
import { TableModule } from 'primeng/table'
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
@NgModule({
    declarations: [
        ThreadTypeListComponent,
        ThreadTypeSaveComponent,
        ThreadTypeUpdateComponent
    ],
    imports: [
        ThreadTypeRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule
    ]
})
export class ThreadTypeModule { }