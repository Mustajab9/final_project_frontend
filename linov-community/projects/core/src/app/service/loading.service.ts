import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoadingService{
    loading$?: Observable<boolean>
    private loadingObs?: Observer<boolean>

    constructor(){
        this.loading$ = new Observable(obs => {
            this.loadingObs = obs
        })
    }

    loading(isLoading: boolean): void {
        this.loadingObs?.next(isLoading)
    }
}