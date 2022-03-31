import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RegencyListComponent } from "./regency-list/regency-list.component";
import { RegencySaveComponent } from "./regency-save/regency-save.component";
import { RegencyUpdateComponent } from "./regency-update/regency-update.component";
import { RegencyRouter } from "./regency.router";

@NgModule({
    declarations: [
        RegencyListComponent,
        RegencySaveComponent,
        RegencyUpdateComponent
    ],
    imports: [
        RegencyRouter,
        CommonModule,
        FormsModule
    ]
})
export class RegencyModule { }