import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseComponent } from "./course-list/course.component";
import { CourseSaveComponent } from "./course-save/course-save.component";
import { CourseUpdateComponent } from "./course-update/course-update.component";

const routes : Routes = [
    {
        path : '',
        component : CourseComponent
    },
    {
        path : 'save',
        component : CourseSaveComponent
    },
    {
        path : 'update',
        component : CourseUpdateComponent
    }
]

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class CourseRouter {}