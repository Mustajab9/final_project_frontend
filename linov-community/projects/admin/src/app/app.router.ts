import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { NavfootComponent } from "./pages/navfoot/navfoot.component"
import { NavfootModule } from "./pages/navfoot/navfoot.module"
import { AccessGuard } from "../../../core/src/app/guard/access.guard"
import { AuthGuard } from "../../../core/src/app/guard/auth.guard"

const routes: Routes = [
    {
        path: 'admin',
        component: NavfootComponent,
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/category',
        component: NavfootComponent,
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/event-type',
        component: NavfootComponent,
        loadChildren: () => import('./pages/event-type/event-type.module').then(m => m.EventTypeModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/industry',
        component: NavfootComponent,
        loadChildren: () => import('./pages/industry/industry.module').then(m => m.IndustryModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/payment-method',
        component: NavfootComponent,
        loadChildren: () => import('./pages/payment-method/payment-method.module').then(m => m.PaymentMethodModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/position',
        component: NavfootComponent,
        loadChildren: () => import('./pages/position/position.module').then(m => m.PositionModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/price-list-event',
        component: NavfootComponent,
        loadChildren: () => import('./pages/price-list-event/price-list-event.module').then(m => m.PriceListEventModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/price-list-member',
        component: NavfootComponent,
        loadChildren: () => import('./pages/price-list-member/price-list-member.module').then(m => m.PriceListMemberModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/profile',
        component: NavfootComponent,
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/province',
        component: NavfootComponent,
        loadChildren: () => import('./pages/province/province.module').then(m => m.ProvinceModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/regency',
        component: NavfootComponent,
        loadChildren: () => import('./pages/regency/regency.module').then(m => m.RegencyModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/role',
        component: NavfootComponent,
        loadChildren: () => import('./pages/role/role.module').then(m => m.RoleModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/social-media',
        component: NavfootComponent,
        loadChildren: () => import('./pages/social-media/social-media.module').then(m => m.SocialMediaModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/thread-type',
        component: NavfootComponent,
        loadChildren: () => import('./pages/thread-type/thread-type.module').then(m => m.ThreadTypeModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/user',
        component: NavfootComponent,
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin/event',
        component: NavfootComponent,
        loadChildren: () => import('./pages/event/event.module').then(m => m.EventModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'admin',
        component: NavfootComponent,
        loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordModule),
        canActivate: [AccessGuard],
        canLoad: [AuthGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        NavfootModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppAdminRouter { }