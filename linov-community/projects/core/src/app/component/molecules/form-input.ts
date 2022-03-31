import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core'

@Component({
    selector: 'form-input',
    template: ` <app-label  [forLabel]="forLabel" [nameLabel]="nameLabel" [classLabel]="classLabel"
                            [requiredLabel]="requiredLabel">
                </app-label>
                <app-input  [typeInput]="typeInput" [idInput]="forLabel" [classInput]="classInput"
                            [maxInput]="maxInput" [minInput]="minInput" [requiredInput]="requiredLabel"
                            [placeholderInput]="placeholderInput" [ngModelInput]="ngModelInput" [valueInput]="valueInput"
                            (ngModelInputChange)="dataChange($event)" (inputChange)="changeInput($event)">
                </app-input>`
})

export class FormInputComponent{

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
    typeInput: string = 'text'

    @Input()
    classInput?: string

    @Input()
    maxInput?: string

    @Input()
    minInput?: string

    @Input()
    placeholderInput?: string

    @Input()
    valueInput?: string

    @Input()
    ngModelInput!: any

    @Output()
    ngModelInputChange: EventEmitter<any> = new EventEmitter<any>()

    @Output()
    inputChange: EventEmitter<any> = new EventEmitter<any>()

    dataChange(data: any): void {
        this.ngModelInputChange.emit(data)
    }

    changeInput(data: any): void {
        this.inputChange.emit(data)
    }
}