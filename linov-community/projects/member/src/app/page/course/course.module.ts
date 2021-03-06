import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { ButtonModule } from "primeng/button"
import { ChartModule } from 'primeng/chart'
import { ListboxModule } from 'primeng/listbox'
import { TabViewModule } from 'primeng/tabview'
import { ToolbarModule } from "primeng/toolbar"

import { CourseRouter } from "./course.router"
import { CourseComponent } from "./course.component"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"

@NgModule({
    declarations: [
        CourseComponent,
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        TabViewModule,
        ChartModule,
        ListboxModule,
        CourseRouter,
        ToolbarModule
    ]
})
export class CourseModule { }