import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserListComponent } from "./user-list/user-list.component";
import { UserSaveComponent } from "./user-save/user-save.component";
import { UserUpdateComponent } from "./user-update/user-update.component";
import { UserRouter } from "./user.router";
import { TableModule } from 'primeng/table'
import { ButtonModule } from "primeng/button";
import { ConfirmationService, MessageService } from "primeng/api";
import { ToolbarModule } from "primeng/toolbar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { userReducer } from "../../../../../core/src/app/state/user/user.reducer";
import { UserEffect } from "../../../../../core/src/app/state/user/user.effect";

@NgModule({
    declarations: [
        UserListComponent,
        UserSaveComponent,
        UserUpdateComponent
    ],
    imports: [
        UserRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('userStore', userReducer),
        EffectsModule.forFeature([UserEffect])
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class UserModule { }