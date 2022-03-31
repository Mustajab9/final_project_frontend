import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IndustryListComponent } from "./industry-list/industry-list.component";
import { IndustrySaveComponent } from "./industry-save/industry-save.component";
import { IndustryUpdateComponent } from "./industry-update/industry-update.component";
import { IndustryRouter } from "./industry.router";

@NgModule({
    declarations: [
        IndustryListComponent,
        IndustrySaveComponent,
        IndustryUpdateComponent
    ],
    imports: [
        IndustryRouter,
        CommonModule,
        FormsModule
    ]
})
export class IndustryModule { }