import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SocialMediaListComponent } from "./social-media-list/social-media-list.component";
import { SocialMediaSaveComponent } from "./social-media-save/social-media-save.component";
import { SocialMediaUpdateComponent } from "./social-media-update/social-media-update.component";
import { SocialMediaRouter } from "./social-media.router";
import { TableModule } from 'primeng/table'
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToolbarModule } from "primeng/toolbar";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ConfirmationService, MessageService } from "primeng/api";
import { ComponentModule } from "../../../../../core/src/app/component/components.module"
import { SocialMediaEffect } from "../../../../../core/src/app/state/social-media/social-media.effect";
import { socialMediaReducer } from "../../../../../core/src/app/state/social-media/social-media.reducer";
@NgModule({
    declarations: [
        SocialMediaListComponent,
        SocialMediaSaveComponent,
        SocialMediaUpdateComponent
    ],
    imports: [
        SocialMediaRouter,
        CommonModule,
        FormsModule,
        ComponentModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        ToolbarModule,
        StoreModule.forFeature('socialMediaStore', socialMediaReducer),
        EffectsModule.forFeature([SocialMediaEffect])
    ],
    providers: [
        ConfirmationService,
        MessageService
    ]
})
export class SocialMediaModule { }