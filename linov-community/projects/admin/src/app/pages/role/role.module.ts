import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RoleListComponent } from "./role-list/role-list.component";
import { RoleRouter } from "./role.router";
import { RoleSaveComponent } from './role-save/role-save.component';
import { RoleUpdateComponent } from './role-update/role-update.component';

@NgModule({
    declarations: [
        RoleListComponent,
        RoleSaveComponent,
        RoleUpdateComponent
    ],
    imports: [
        RoleRouter,
        CommonModule,
        FormsModule
    ]
})
export class RoleModule { }