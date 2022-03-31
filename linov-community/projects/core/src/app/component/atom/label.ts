import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-label',
    template: ` <label [for]="forLabel" class="form-label {{classLabel}}">
                    {{nameLabel}}<span *ngIf="requiredLabel" class="text-danger">*</span>
                </label>`
})
export class LabelComponent {

    @Input()
    nameLabel!: string

    @Input()
    forLabel!: string

    @Input()
    classLabel?: string

    @Input()
    requiredLabel: boolean = false
}