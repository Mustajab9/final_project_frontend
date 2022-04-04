import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ThreadDetailComponent } from "./thread-detail.component";
import { ThreadDetailRouter } from "./thread-detail.router";

@NgModule({
    declarations: [
        ThreadDetailComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        TabViewModule,
        SidebarModule,
        MegaMenuModule,
        ButtonModule,
        ThreadDetailRouter
    ]
})
export class ThreadDetailModule { }