import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"

import { AvatarModule } from 'primeng/avatar'
import { AvatarGroupModule } from 'primeng/avatargroup'
import { BadgeModule } from 'primeng/badge'
import { ButtonModule } from 'primeng/button'
import { CascadeSelectModule } from 'primeng/cascadeselect'
import { MegaMenuModule } from 'primeng/megamenu'
import { MenubarModule } from 'primeng/menubar'
import { PanelMenuModule } from 'primeng/panelmenu'
import { SidebarModule } from 'primeng/sidebar'
import { TabMenuModule } from 'primeng/tabmenu'

import { NavbarComponent } from "./navbar.component"
import { ComponentModule } from "../../../../../core/src/app/component/components.module"

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