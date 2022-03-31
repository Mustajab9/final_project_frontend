import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes : Routes = [
    {
        path : 'login',
        loadChildren : () => import('./page/login/login.module').then(m => m.LoginModule)
    },
    {
        path : 'sign-up',
        loadChildren : () => import('./page/sign-up/sign-up.module').then(m => m.SignUpModule)
    },
    {
        path : 'account-details',
        loadChildren : () => import('./page/account-details/account-details.module').then(m => m.AccountDetailsModule)
    },
    {
        path : 'forgot-password',
        loadChildren : () => import('./page/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
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
export class AppLoginRouter {}