import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
    selector: 'app-button',
    template: ` <button pButton pRipple (click)="clickBtn()" [class]="classBtn" [routerLink]="routerLinkBtn" [label]="labelBtn"
                        [id]="idBtn" [name]="idBtn" [disabled]="disbaledBtn" [type]="typeBtn" icon="pi {{iconType}}"
                        iconPos="left">
                </button>`
})

export class ButtonComponent {

    @Input()
    labelBtn!: string

    @Input()
    classBtn?: string

    @Input()
    routerLinkBtn!: string

    @Input()
    idBtn!: string

    @Input()
    typeBtn: string = 'button'

    @Input()
    requiredIcon: boolean = false

    @Input()
    iconType?: string

    @Input()
    disbaledBtn: boolean = false

    @Output()
    clickBtnEvent: EventEmitter<void> = new EventEmitter<void>()

    clickBtn(): void {
        this.clickBtnEvent.emit()
    }
}