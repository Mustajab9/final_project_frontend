import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavfootComponent } from "./pages/navfoot/navfoot.component";
import { NavfootModule } from "./pages/navfoot/navfoot.module";

const routes: Routes = [
    {
        path: 'admin/dashboard',
        component: NavfootComponent,
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'admin/category',
        component: NavfootComponent,
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
    },
    {
        path: 'admin/event-type',
        component: NavfootComponent,
        loadChildren: () => import('./pages/event-type/event-type.module').then(m => m.EventTypeModule)
    },
    {
        path: 'admin/industry',
        component: NavfootComponent,
        loadChildren: () => import('./pages/industry/industry.module').then(m => m.IndustryModule)
    },
    {
        path: 'admin/payment-method',
        component: NavfootComponent,
        loadChildren: () => import('./pages/payment-method/payment-method.module').then(m => m.PaymentMethodModule)
    },
    {
        path: 'admin/position',
        component: NavfootComponent,
        loadChildren: () => import('./pages/position/position.module').then(m => m.PositionModule)
    },
    {
        path: 'admin/price-list-event',
        component: NavfootComponent,
        loadChildren: () => import('./pages/price-list-event/price-list-event.module').then(m => m.PriceListEventModule)
    },
    {
        path: 'admin/price-list-member',
        component: NavfootComponent,
        loadChildren: () => import('./pages/price-list-member/price-list-member.module').then(m => m.PriceListMemberModule)
    },
    {
        path: 'admin/profile',
        component: NavfootComponent,
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: 'admin/province',
        component: NavfootComponent,
        loadChildren: () => import('./pages/province/province.module').then(m => m.ProvinceModule)
    },
    {
        path: 'admin/regency',
        component: NavfootComponent,
        loadChildren: () => import('./pages/regency/regency.module').then(m => m.RegencyModule)
    },
    {
        path: 'admin/role',
        component: NavfootComponent,
        loadChildren: () => import('./pages/role/role.module').then(m => m.RoleModule)
    },
    {
        path: 'admin/social-media',
        component: NavfootComponent,
        loadChildren: () => import('./pages/social-media/social-media.module').then(m => m.SocialMediaModule)
    },
    {
        path: 'admin/thread-type',
        component: NavfootComponent,
        loadChildren: () => import('./pages/thread-type/thread-type.module').then(m => m.ThreadTypeModule)
    },
    {
        path: 'admin/user',
        component: NavfootComponent,
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
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