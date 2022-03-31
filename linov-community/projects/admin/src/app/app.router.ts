import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavfootComponent } from "./pages/navfoot/navfoot.component";
import { NavfootModule } from "./pages/navfoot/navfoot.module";

const routes: Routes = [
    {
        path: 'category',
        component: NavfootComponent,
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
    },
    {
        path: 'event-type',
        component: NavfootComponent,
        loadChildren: () => import('./pages/event-type/event-type.module').then(m => m.EventTypeModule)
    },
    {
        path: 'industry',
        component: NavfootComponent,
        loadChildren: () => import('./pages/industry/industry.module').then(m => m.IndustryModule)
    },
    {
        path: 'payment-method',
        component: NavfootComponent,
        loadChildren: () => import('./pages/payment-method/payment-method.module').then(m => m.PaymentMethodModule)
    },
    {
        path: 'position',
        component: NavfootComponent,
        loadChildren: () => import('./pages/position/position.module').then(m => m.PositionModule)
    },
    {
        path: 'price-list-event',
        component: NavfootComponent,
        loadChildren: () => import('./pages/price-list-event/price-list-event.module').then(m => m.PriceListEventModule)
    },
    {
        path: 'price-list-member',
        component: NavfootComponent,
        loadChildren: () => import('./pages/price-list-member/price-list-member.module').then(m => m.PriceListMemberModule)
    },
    {
        path: 'profile',
        component: NavfootComponent,
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: 'province',
        component: NavfootComponent,
        loadChildren: () => import('./pages/province/province.module').then(m => m.ProvinceModule)
    },
    {
        path: 'regency',
        component: NavfootComponent,
        loadChildren: () => import('./pages/regency/regency.module').then(m => m.RegencyModule)
    },
    {
        path: 'role',
        component: NavfootComponent,
        loadChildren: () => import('./pages/role/role.module').then(m => m.RoleModule)
    },
    {
        path: 'social-media',
        component: NavfootComponent,
        loadChildren: () => import('./pages/social-media/social-media.module').then(m => m.SocialMediaModule)
    },
    {
        path: 'thread-type',
        component: NavfootComponent,
        loadChildren: () => import('./pages/thread-type/thread-type.module').then(m => m.ThreadTypeModule)
    },
    {
        path: 'user',
        component: NavfootComponent,
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
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