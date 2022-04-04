import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './page/navbar/navbar.component';

const routes: Routes = [
    {
        path: 'member/dashboard',
        component: NavbarComponent,
        loadChildren: () => import('./page/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'member/thread',
        component: NavbarComponent,
        loadChildren: () => import('./page/thread/thread-profile/thread.module').then(m => m.ThreadModule)
    },
    {
        path: 'member/thread-detail',
        component: NavbarComponent,
        loadChildren: () => import('./page/thread/thread-detail/thread-detail.module').then(m => m.ThreadDetailModule)
    },
    {
        path: 'member/thread-save',
        component: NavbarComponent,
        loadChildren: () => import('./page/thread/thread-save/thread-save.module').then(m => m.ThreadSaveModule)
    },
    {
        path: 'member/course',
        component: NavbarComponent,
        loadChildren: () => import('./page/course/course.module').then(m => m.CourseModule)
    }, 
    {
        path: 'member/cart-list',
        component: NavbarComponent,
        loadChildren: () => import('./page/cart/cart-list/cart-list.module').then(m => m.CartListModule)
    }, 
    {
        path: 'member/cart-checkout',
        component: NavbarComponent,
        loadChildren: () => import('./page/cart/cart-checkout/cart-checkout.module').then(m => m.CartCheckoutModule)
    }, 
    {
        path: 'member/profile-update',
        component: NavbarComponent,
        loadChildren: () => import('./page/profile/profile-update/profile-update.module').then(m => m.ProfileUpdateModule)
    }, 
    {
        path: 'member/article-dashboard',
        component: NavbarComponent,
        loadChildren: () => import('./page/article/article-dashboard/article-dashboard.module').then(m => m.ArticleDashboardModule)
    }, 
    {
        path: '',
        redirectTo: 'member/dashboard',
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