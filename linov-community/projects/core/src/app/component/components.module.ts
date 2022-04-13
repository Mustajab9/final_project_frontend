import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AComponent } from './atom/a'
import { ButtonComponent } from './atom/button'
import { InputComponent } from './atom/input'
import { LabelComponent } from './atom/label'
import { SelectComponent } from './atom/select'
import { TextareaComponent } from './atom/textarea'
import { FormButtonComponent } from './molecules/form-button'
import { FormInputComponent } from './molecules/form-input'
import { FormSelectComponent } from './molecules/form-select'
import { FormTextareaComponent } from './molecules/form-textarea'
import { LiAComponent } from './molecules/li-a'
import { ButtonModule } from 'primeng/button'

@NgModule({
    declarations: [
        AComponent,
        ButtonComponent,
        InputComponent,
        LabelComponent,
        SelectComponent,
        TextareaComponent,
        FormButtonComponent,
        FormInputComponent,
        FormSelectComponent,
        FormTextareaComponent,
        LiAComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ButtonModule,
        RouterModule
    ],
    exports: [
        AComponent,
        ButtonComponent,
        InputComponent,
        LabelComponent,
        SelectComponent,
        TextareaComponent,
        FormButtonComponent,
        FormInputComponent,
        FormSelectComponent,
        FormTextareaComponent,
        LiAComponent,
        RouterModule
    ]
})
export class ComponentModule { }