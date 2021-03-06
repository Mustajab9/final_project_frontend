import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./page/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'member',
        loadChildren: () => import('./page/sign-up/sign-up.module').then(m => m.SignUpModule)
    },
    {
        path: 'member',
        loadChildren: () => import('./page/verification-code/verification-code.module').then(m => m.VerificationCodeModule)
    },
    {
        path: 'member',
        loadChildren: () => import('./page/account-details/account-details.module').then(m => m.AccountDetailsModule)
    },
    {
        path: 'member',
        loadChildren: () => import('./page/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppLoginRouter { }