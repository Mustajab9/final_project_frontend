import { Component, EventEmitter, Input, Output } from "@angular/core"

@Component({
    selector: 'li-a',
    template: ` <li [class]="classLi">
                    <app-a [classA]="classA" [routerLinkA]="routerLinkA" [idA]="idA" [labelA]="labelA"
                    (clickAEvent)="clickAEvent" [requiredIcon]="requiredIcon" [iconType]="iconType">
                    </app-a>
                </li>`
})

export class LiAComponent {

    @Input()
    classLi!: string

    @Input()
    labelA!: string

    @Input()
    classA?: string

    @Input()
    routerLinkA!: string

    @Input()
    idA!: string

    @Input()
    roleA?: string

    @Input()
    requiredIcon: boolean = false

    @Input()
    iconType?: string

    @Output()
    clickAEvent = new EventEmitter<void>()

    clickA(): void {
        this.clickAEvent.emit()
    }
}