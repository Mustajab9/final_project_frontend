import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EventRouter } from "./event.router";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ButtonModule } from "primeng/button";
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { ListboxModule } from 'primeng/listbox';
import { ToolbarModule } from "primeng/toolbar";
import { EnrollEventComponent } from './enroll-event/enroll-event.component';
import { CartEnrollComponent } from './cart-enroll/cart-enroll.component';

@NgModule({
    declarations: [
        EnrollEventComponent,
        CartEnrollComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        TabViewModule,
        ChartModule,
        ListboxModule,
        EventRouter,
        ToolbarModule
    ]
})
export class EventModule { }