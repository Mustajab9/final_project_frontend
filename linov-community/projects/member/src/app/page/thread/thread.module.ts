import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ThreadComponent } from "./thread-profile/thread.component";
import { ThreadDetailComponent } from "./thread-detail/thread-detail.component";
import { ThreadSaveComponent } from "./thread-save/thread-save.component";
import { ThreadRouter } from "./thread.router";
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [
        ThreadComponent, ThreadDetailComponent, ThreadSaveComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        TabViewModule,
        SidebarModule,
        MegaMenuModule,
        ButtonModule,
        FileUploadModule,
        HttpClientModule,
        MultiSelectModule,
        DropdownModule,
        ThreadRouter
    ]
})
export class ThreadModule { }