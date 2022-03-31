import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ControlContainer, NgForm } from '@angular/forms'

@Component({
    selector: 'app-input',
    template: `<input   [type]="typeInput" class="form-control {{classInput}}" [id]="idInput" [name]="idInput"
                        [maxlength]="maxInput || null" [minlength]="minInput || null" [required]="requiredInput"
                        [placeholder]="placeholderInput" [(ngModel)]="ngModelInput" (ngModelChange)="dataChange($event)"
                        (change)="changeInput($event)" [value]="valueInput" [disabled]="disabledInput">`,
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class InputComponent {

    @Input()
    typeInput: string = 'text'

    @Input()
    classInput?: string

    @Input()
    idInput!: string

    @Input()
    maxInput?: string

    @Input()
    minInput?: string

    @Input()
    requiredInput: boolean = false

    @Input()
    disabledInput: boolean = false

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