import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavfootComponent } from "./pages/navfoot/navfoot.component";
import { NavfootModule } from "./pages/navfoot/navfoot.module";

const routes: Routes = [
    {
        path: 'role',
        component: NavfootComponent,
        loadChildren: () => import('./pages/role/role.module').then(m => m.RoleModule)
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        NavfootModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouter { }