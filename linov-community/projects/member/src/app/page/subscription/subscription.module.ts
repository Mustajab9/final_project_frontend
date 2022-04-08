import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { TabViewModule } from "primeng/tabview";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { SubscriptionComponent } from "./subscription.component";
import { SubscriptionRouter } from "./subscription.router";

@NgModule({
    declarations: [
        SubscriptionComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        TabViewModule,
        SubscriptionRouter
    ]
})
export class SubscriptionModule { }