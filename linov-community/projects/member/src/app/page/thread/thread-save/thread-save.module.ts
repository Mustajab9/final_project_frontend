import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ThreadSaveComponent } from "./thread-save.component";
import { ThreadSaveRouter } from "./thread-save.router";
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        ThreadSaveComponent
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
        ThreadSaveRouter
    ]
})
export class ThreadSaveModule { }