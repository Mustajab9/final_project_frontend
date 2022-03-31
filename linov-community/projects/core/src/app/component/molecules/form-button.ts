import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core'

@Component({
    selector: 'form-button',
    template: ` <div [class]="divClass">
                    <app-button (clickBtnEvent)="clickBtnPrimary()" [classBtn]="classBtnPrimary" [labelBtn]="labelBtnPrimary"
                                [idBtn]="idBtnPrimary" [routerLinkBtn]="routerLinkBtnPrimary" [typeBtn]="typeBtnPrimary"
                                [requiredIcon]="requiredIconPrimary" [iconType]="iconTypePrimary">
                    </app-button>
                    <app-button (clickBtnEvent)="clickBtnSecondary()" [classBtn]="classBtnSecondary" [labelBtn]="labelBtnSecondary"
                                [idBtn]="idBtnSecondary" [routerLinkBtn]="routerLinkBtnSecondary" [requiredIcon]="requiredIconSecondary"
                                [iconType]="iconTypeSecondary" [disbaledBtn]="disbaledBtnSecondary" [typeBtn]="typeBtnSecondary">
                    </app-button>
                </div>`
})

export class FormButtonComponent{

    @HostBinding()
    @Input()
    divClass?: string

    @Input()
    labelBtnPrimary!: string

    @Input()
    classBtnPrimary?: string

    @Input()
    idBtnPrimary!: string

    @Input()
    routerLinkBtnPrimary!: string

    @Input()
    requiredIconPrimary: boolean = false

    @Input()
    typeBtnPrimary: string = 'button'

    @Input()
    iconTypePrimary?: string

    @Output()
    clickBtnPrimaryEvent: EventEmitter<void> = new EventEmitter<void>()

    @Input()
    labelBtnSecondary!: string

    @Input()
    classBtnSecondary?: string

    @Input()
    idBtnSecondary!: string

    @Input()
    routerLinkBtnSecondary!: string

    @Input()
    requiredIconSecondary: boolean = false

    @Input()
    iconTypeSecondary?: string

    @Input()
    disbaledBtnSecondary: boolean = false

    @Input()
    typeBtnSecondary: string = 'button'

    @Output()
    clickBtnSecondaryEvent: EventEmitter<void> = new EventEmitter<void>()

    clickBtnPrimary(): void {
        this.clickBtnPrimaryEvent.emit()
    }

    clickBtnSecondary(): void {
        this.clickBtnSecondaryEvent.emit()
    }
}