import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ControlContainer, NgForm } from '@angular/forms'

@Component({
    selector: 'app-select',
    template: ` <select class="form-select {{classSelect}}" [id]="idSelect" [name]="idSelect"
                [(ngModel)]="ngModelSelect" (ngModelChange)="dataChange($event)" [required]="requiredSelect">
                    <option *ngFor="let data of optionData" [value]="data[optionValue]">{{data[optionLabel]}}</option>
                </select>`,
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class SelectComponent{
    @Input()
    classSelect?: string

    @Input()
    idSelect!: string

    @Input()
    optionData: any[] = []

    @Input()
    optionValue!: any

    @Input()
    optionLabel!: string

    @Input()
    requiredSelect: boolean = false

    @Input()
    ngModelSelect!: any

    @Output()
    ngModelSelectChange = new EventEmitter<any>()

    dataChange(data: any): void {
        this.ngModelSelectChange.emit(data)
    }
}