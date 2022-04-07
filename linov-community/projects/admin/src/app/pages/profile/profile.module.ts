import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { SubscriptionEffect } from "projects/core/src/app/state/subscription/subscription.effect";
import { subscriptionReducer } from "projects/core/src/app/state/subscription/subscription.reducer";
import { ProfileListComponent } from "./profile-list/profile-list.component";
import { ProfileRouter } from "./profile.router";

@NgModule({
    declarations: [
        ProfileListComponent,
    ],
    imports: [
        ProfileRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        ToolbarModule,
        StoreModule.forFeature('subscriptionStore', subscriptionReducer),
        EffectsModule.forFeature([SubscriptionEffect])
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class ProfileModule { }