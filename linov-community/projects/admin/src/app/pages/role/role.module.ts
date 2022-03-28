import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RoleListComponent } from "./role-list/role-list.component";
import { RoleRouter } from "./role.router";

@NgModule({
    declarations: [RoleListComponent],
    imports: [RoleRouter, CommonModule, FormsModule]
})
export class RoleModule { }