import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { GetAllEventDtoDataRes } from "../dto/event/get-all-event-dto-data-res";

@Injectable({
    providedIn: 'root'
})

export class CheckOutService {
    event$?: Observable<GetAllEventDtoDataRes[]>
    eventObs?: Observer<GetAllEventDtoDataRes[]>

    constructor(){
        this.event$ = new Observable(obs => {
            this.eventObs = obs
        })
    }

    addCart(data: GetAllEventDtoDataRes[]) : void {
        localStorage.setItem('cart', JSON.stringify(data))
    }

    getData(): GetAllEventDtoDataRes[] | null {
        const data = localStorage.getItem('cart')

        if (data) {
            return JSON.parse(data)
        }

        return null
    }

    clearData(): void {
        localStorage.removeItem('cart')
    }
}