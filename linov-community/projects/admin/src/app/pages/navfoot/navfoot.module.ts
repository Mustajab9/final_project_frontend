import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NavfootComponent } from "projects/admin/src/app/pages/navfoot/navfoot.component";
import { ComponentModule } from "../../../../../core/src/app/component/components.module"

@NgModule({
    declarations: [
        NavfootComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ComponentModule,
        FormsModule
    ],
    exports: [
        RouterModule
    ]
})
export class NavfootModule { }