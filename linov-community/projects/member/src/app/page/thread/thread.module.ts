import { CommonModule } from "@angular/common"
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { ConfirmationService } from "primeng/api"
import { BlockUIModule } from 'primeng/blockui'
import { ButtonModule } from 'primeng/button'
import { CarouselModule } from 'primeng/carousel'
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { DropdownModule } from 'primeng/dropdown'
import { FileUploadModule } from 'primeng/fileupload'
import { InputSwitchModule } from 'primeng/inputswitch'
import { MegaMenuModule } from 'primeng/megamenu'
import { MultiSelectModule } from 'primeng/multiselect'
import { SidebarModule } from 'primeng/sidebar'
import { TableModule } from 'primeng/table'
import { TabViewModule } from 'primeng/tabview'
import { TooltipModule } from 'primeng/tooltip'

import { ThreadRouter } from "./thread.router"
import { ThreadComponent } from "./thread-profile/thread.component"
import { ThreadDetailComponent } from "./thread-detail/thread-detail.component"
import { ThreadSaveComponent } from "./thread-save/thread-save.component"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"

@NgModule({
    declarations: [
        ThreadComponent, ThreadDetailComponent, ThreadSaveComponent
    ],
    imports: [
        ComponentModule, CommonModule, FormsModule,
        TabViewModule, SidebarModule, MegaMenuModule,
        ButtonModule, FileUploadModule, HttpClientModule,
        MultiSelectModule, DropdownModule, TableModule,
        CarouselModule, BlockUIModule, TooltipModule,
        ConfirmDialogModule, InputSwitchModule,
        ThreadRouter
    ],
    providers: [
        ConfirmationService
    ]
})
export class ThreadModule { }