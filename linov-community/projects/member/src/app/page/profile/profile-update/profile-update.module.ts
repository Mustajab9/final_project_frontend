import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ProfileUpdateComponent } from "./profile-update.component";
import { ProfileUpdateRouter } from "./profile-update.router";
import {TabViewModule} from 'primeng/tabview';

@NgModule({
    declarations: [
        ProfileUpdateComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        TabViewModule,
        ProfileUpdateRouter
    ]
})
export class ProfileUpdateModule { }