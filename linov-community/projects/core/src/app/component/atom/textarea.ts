import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ControlContainer, NgForm } from '@angular/forms'

@Component({
    selector: 'app-textarea',
    template: `<textarea    class="form-control {{classTextarea}}" [id]="idTextarea" [name]="idTextarea"
                            [cols]="colsTextarea" [rows]="rowsTextarea" [required]="requiredTextarea" [disabled]="disabledTextarea"
                            [placeholder]="placeholderTextarea" [(ngModel)]="ngModelTextarea" (ngModelChange)="dataChange($event)">
                </textarea>`,
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class TextareaComponent {

    @Input()
    classTextarea?: string

    @Input()
    idTextarea!: string

    @Input()
    colsTextarea?: string

    @Input()
    rowsTextarea?: string

    @Input()
    requiredTextarea: boolean = false

    @Input()
    disabledTextarea: boolean = false

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