import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CourseRouter } from "./course.router";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { ButtonModule } from "primeng/button";
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { ListboxModule } from 'primeng/listbox';
import { ToolbarModule } from "primeng/toolbar";
import { CourseComponent } from "./course-list/course.component";
import { CourseSaveComponent } from './course-save/course-save.component';
import { CourseUpdateComponent } from './course-update/course-update.component';

@NgModule({
    declarations: [
        CourseComponent,
        CourseSaveComponent,
        CourseUpdateComponent
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