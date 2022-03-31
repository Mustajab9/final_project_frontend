import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PriceListMemberListComponent } from "./price-list-member-list/price-list-member-list.component";
import { PriceListMemberSaveComponent } from "./price-list-member-save/price-list-member-save.component";
import { PriceListMemberUpdateComponent } from "./price-list-member-update/price-list-member-update.component";
import { PriceListMemberRouter } from "./price-list-member.router";

@NgModule({
    declarations: [
        PriceListMemberListComponent,
        PriceListMemberSaveComponent,
        PriceListMemberUpdateComponent
    ],
    imports: [
        PriceListMemberRouter,
        CommonModule,
        FormsModule
    ]
})
export class PriceListMemberModule { }