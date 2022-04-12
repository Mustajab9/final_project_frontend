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
        loadChildren: () => import('./page/thread/thread.module').then(m => m.ThreadModule)
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
        path: 'member/event',
        component: NavbarComponent,
        loadChildren: () => import('./page/event/event.module').then(m => m.EventModule)
    },
    {
        path: 'member/profile-update',
        component: NavbarComponent,
        loadChildren: () => import('./page/profile/profile-update/profile-update.module').then(m => m.ProfileUpdateModule)
    },
    {
        path: 'member/subscription',
        component: NavbarComponent,
        loadChildren: () => import('./page/subscription/subscription.module').then(m => m.SubscriptionModule)
    },
    {
        path: 'member/article',
        component: NavbarComponent,
        loadChildren: () => import('./page/article/article.module').then(m => m.ArticleModule)
    },
    {
        path: '',
        redirectTo: 'member/dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/member/dashboard',
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