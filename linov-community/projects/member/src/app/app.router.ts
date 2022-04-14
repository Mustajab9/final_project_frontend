import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from 'projects/core/src/app/guard/access.guard';
import { AuthGuard } from 'projects/core/src/app/guard/auth.guard';
import { NavbarComponent } from './page/navbar/navbar.component';

const routes: Routes = [
    {
        path: 'member',
        component: NavbarComponent,
        loadChildren: () => import('./page/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AccessGuard]
    },
    {
        path: 'member',
        component: NavbarComponent,
        loadChildren: () => import('./page/thread/thread.module').then(m => m.ThreadModule),
        canActivate: [AccessGuard]
    },
    {
        path: 'member',
        component: NavbarComponent,
        loadChildren: () => import('./page/course/course.module').then(m => m.CourseModule),
        canActivate: [AccessGuard]
    },
    {
        path: 'member',
        component: NavbarComponent,
        loadChildren: () => import('./page/cart/cart-list/cart-list.module').then(m => m.CartListModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'member',
        component: NavbarComponent,
        loadChildren: () => import('./page/cart/cart-checkout/cart-checkout.module').then(m => m.CartCheckoutModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'member/event',
        component: NavbarComponent,
        loadChildren: () => import('./page/event/event.module').then(m => m.EventModule),
        canActivate: [AccessGuard]
    },
    {
        path: 'member',
        component: NavbarComponent,
        loadChildren: () => import('./page/profile/profile-update/profile-update.module').then(m => m.ProfileUpdateModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'member',
        component: NavbarComponent,
        loadChildren: () => import('./page/subscription/subscription.module').then(m => m.SubscriptionModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'member',
        component: NavbarComponent,
        loadChildren: () => import('./page/article/article.module').then(m => m.ArticleModule),
        canActivate: [AccessGuard]
    },
    {
        path: 'member',
        component: NavbarComponent,
        loadChildren: () => import('./page/change-password/change-password.module').then(m => m.ChangePasswordModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
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