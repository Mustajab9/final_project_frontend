import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ComponentModule } from "projects/login/src/app/component/components.module";
import { ThreadComponent } from "./thread.component";
import { ThreadRouter } from "./thread.router";
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        ThreadComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        CardModule,
        TabViewModule,
        SidebarModule,
        MegaMenuModule,
        ButtonModule,
        ThreadRouter
    ]
})
export class ThreadModule { }