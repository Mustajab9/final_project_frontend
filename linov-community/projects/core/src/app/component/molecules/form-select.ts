import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core'

@Component({
    selector: 'form-select',
    template: ` <app-label  [forLabel]="forLabel" [nameLabel]="nameLabel" [classLabel]="classLabel"
                            [requiredLabel]="requiredLabel">
                </app-label>
                <app-select [idSelect]="forLabel" [requiredSelect]="requiredLabel" [classSelect]="classSelect"
                            [ngModelSelect]="ngModelSelect" (ngModelSelectChange)="dataChange($event)"
                            [optionData]="optionData" [optionValue]="optionValue" [optionLabel]="optionLabel">
                </app-select>`
})

export class FormSelectComponent{

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
    classSelect?: string

    @Input()
    optionData: any[] = []

    @Input()
    optionValue!: any

    @Input()
    optionLabel!: string

    @Input()
    ngModelSelect!: any

    @Output()
    ngModelSelectChange = new EventEmitter<any>()

    dataChange(data: any): void {
        this.ngModelSelectChange.emit(data)
    }
}