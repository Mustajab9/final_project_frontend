import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserListComponent } from "./user-list/user-list.component";
import { UserSaveComponent } from "./user-save/user-save.component";
import { UserUpdateComponent } from "./user-update/user-update.component";
import { UserRouter } from "./user.router";
import { TableModule } from 'primeng/table'
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { ButtonModule } from "primeng/button";
@NgModule({
    declarations: [
        UserListComponent,
        UserSaveComponent,
        UserUpdateComponent
    ],
    imports: [
        UserRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule
    ]
})
export class UserModule { }