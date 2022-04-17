import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { CartCheckoutComponent } from "./cart-checkout/cart-checkout.component"
import { CartListComponent } from "./cart-list/cart-list.component"

const routes : Routes = [
    {
        path : 'cart/checkout',
        component : CartCheckoutComponent
    },
    {
        path : 'cart/list',
        component : CartListComponent
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
export class CartRouter {}