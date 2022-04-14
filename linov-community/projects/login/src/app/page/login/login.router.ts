import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { LoginComponent } from "./login.component"

const routes : Routes = [
    {
        path : 'member',
        component : LoginComponent
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
export class LoginRouter {}