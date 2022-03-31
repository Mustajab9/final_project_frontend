import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './page/navbar/navbar.component';

const routes: Routes = [
    {
        path: 'thread',
        component: NavbarComponent,
        loadChildren: () => import('./page/thread/thread.module').then(m => m.ThreadModule)
    },
    {
        path: '',
        redirectTo: '/thread',
        pathMatch: 'full'
    }
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouter { }