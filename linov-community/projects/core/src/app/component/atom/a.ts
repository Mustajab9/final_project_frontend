import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
    selector: 'app-a',
    template: ` <a (click)="clickA()" class="{{classA}}" [routerLink]="routerLinkA"
                    [id]="idA" [name]="idA">
                    <i *ngIf="requiredIcon" class="fas {{iconType}}"></i>{{labelA}}
                </a>`
})
export class AComponent {

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