import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RoleListComponent } from "./role-list/role-list.component";
import { RoleRouter } from "./role.router";
import { RoleSaveComponent } from './role-save/role-save.component';
import { RoleUpdateComponent } from './role-update/role-update.component';
import { TableModule } from 'primeng/table'
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { ButtonModule } from "primeng/button";
@NgModule({
    declarations: [
        RoleListComponent,
        RoleSaveComponent,
        RoleUpdateComponent
    ],
    imports: [
        RoleRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule
    ]
})
export class RoleModule { }