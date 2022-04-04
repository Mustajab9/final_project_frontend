import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreadSaveComponent } from "./thread-save.component";

const routes : Routes = [
    {
        path : '',
        component : ThreadSaveComponent
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
export class ThreadSaveRouter {}