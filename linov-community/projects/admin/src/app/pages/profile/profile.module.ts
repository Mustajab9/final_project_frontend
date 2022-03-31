import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProfileListComponent } from "./profile-list/profile-list.component";
import { ProfileSaveComponent } from "./profile-save/profile-save.component";
import { ProfileUpdateComponent } from "./profile-update/profile-update.component";
import { ProfileRouter } from "./profile.router";

@NgModule({
    declarations: [
        ProfileListComponent,
        ProfileSaveComponent,
        ProfileUpdateComponent
    ],
    imports: [
        ProfileRouter,
        CommonModule,
        FormsModule
    ]
})
export class ProfileModule { }