import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NavbarComponent } from "./navbar.component";
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ComponentModule } from "projects/core/src/app/component/components.module";
import { BadgeModule } from 'primeng/badge';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        ComponentModule,
        CommonModule,
        FormsModule,
        TabMenuModule,
        MenubarModule,
        ButtonModule,
        SidebarModule,
        MegaMenuModule,
        PanelMenuModule,
        BadgeModule,
        AvatarModule,
        AvatarGroupModule,
        CascadeSelectModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule { }