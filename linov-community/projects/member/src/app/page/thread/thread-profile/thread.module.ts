import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ThreadComponent } from "./thread.component";
import { ThreadRouter } from "./thread.router";
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { ComponentModule } from "projects/core/src/app/component/components.module";

@NgModule({
    declarations: [
        ThreadComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        TabViewModule,
        SidebarModule,
        MegaMenuModule,
        ButtonModule,
        ThreadRouter
    ]
})
export class ThreadModule { }