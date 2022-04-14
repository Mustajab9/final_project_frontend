import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, tap } from "rxjs"
import { LoadingService } from "../service/loading.service"

@Injectable()
export class LoadingHandlerLRC implements HttpInterceptor {

    constructor(private loadingService: LoadingService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.loading(true)
        return next.handle(req).pipe(
            tap({
                next: data => {
                    if (data instanceof HttpResponse) {
                        if (data.status == 201 || data.status == 200) {
                            this.loadingService.loading(false)
                        }
                    }
                },
                error: err => {
                    if (err instanceof HttpErrorResponse) {
                        this.loadingService.loading(false)
                    }
                }
            })
        )
    }

}