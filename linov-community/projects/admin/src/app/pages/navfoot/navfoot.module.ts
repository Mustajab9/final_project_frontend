import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NavfootComponent } from "projects/admin/src/app/pages/navfoot/navfoot.component";

@NgModule({
    declarations: [
        NavfootComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        RouterModule
    ]
})
export class NavfootModule { }