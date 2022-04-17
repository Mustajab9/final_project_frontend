import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { ButtonModule } from "primeng/button"
import { FileUploadModule } from 'primeng/fileupload'
import { TabViewModule } from 'primeng/tabview'

import { ProfileUpdateRouter } from "./profile-update.router"
import { ProfileUpdateComponent } from "./profile-update.component"
import { ComponentModule } from "../../../../../../core/src/app/component/components.module"

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
        FileUploadModule,
        ProfileUpdateRouter
    ]
})
export class ProfileUpdateModule { }