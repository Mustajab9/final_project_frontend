import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { UserSaveComponent } from "./user-save/user-save.component";
import { UserUpdateComponent } from "./user-update/user-update.component";
import { UserRouter } from "./user.router";

@NgModule({
    declarations: [
        UserListComponent,
        UserSaveComponent,
        UserUpdateComponent
    ],
    imports: [
        UserRouter,
        CommonModule,
        FormsModule
    ]
})
export class UserModule { }