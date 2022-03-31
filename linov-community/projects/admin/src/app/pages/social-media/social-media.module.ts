import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SocialMediaListComponent } from "./social-media-list/social-media-list.component";
import { SocialMediaSaveComponent } from "./social-media-save/social-media-save.component";
import { SocialMediaUpdateComponent } from "./social-media-update/social-media-update.component";
import { SocialMediaRouter } from "./social-media.router";

@NgModule({
    declarations: [
        SocialMediaListComponent,
        SocialMediaSaveComponent,
        SocialMediaUpdateComponent
    ],
    imports: [
        SocialMediaRouter,
        CommonModule,
        FormsModule
    ]
})
export class SocialMediaModule { }