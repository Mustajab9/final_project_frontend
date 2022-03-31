import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { AccountDetailsComponent } from "./account-details.component";
import { AccountDetailsRouter } from "./account-details.router";

@NgModule({
    declarations : [
        AccountDetailsComponent
    ],
    imports : [
        ComponentModule,
        CommonModule,
        FormsModule,
        AccountDetailsRouter
    ]
})
export class AccountDetailsModule {}