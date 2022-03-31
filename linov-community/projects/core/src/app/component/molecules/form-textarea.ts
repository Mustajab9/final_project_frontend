import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core'

@Component({
    selector: 'form-textarea',
    template: ` <app-label  [forLabel]="forLabel" [nameLabel]="nameLabel" [classLabel]="classLabel"
                            [requiredLabel]="requiredLabel">
                </app-label>
                <app-textarea   [idTextarea]="forLabel" [classTextarea]="classInput"
                                [colsTextarea]="colsTextarea" [rowsTextarea]="rowsTextarea" [requiredTextarea]="requiredLabel"
                                [placeholderTextarea]="placeholderTextarea" [ngModelTextarea]="ngModelTextarea"
                                (ngModelTextareaChange)="dataChange($event)">
                </app-textarea>`
})

export class FormTextareaComponent{

    @HostBinding()
    @Input()
    divClass?: string

    @Input()
    nameLabel!: string

    @Input()
    forLabel!: string

    @Input()
    classLabel?: string

    @Input()
    requiredLabel: boolean = false

    @Input()
    typeInput!: string

    @Input()
    classInput?: string

    @Input()
    colsTextarea?: string

    @Input()
    rowsTextarea?: string

    @Input()
    placeholderTextarea?: string

    @Input()
    ngModelTextarea!: any

    @Output()
    ngModelTextareaChange = new EventEmitter<any>()

    dataChange(data: any): void {
        this.ngModelTextareaChange.emit(data)
    }
}