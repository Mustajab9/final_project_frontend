import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Observable, tap } from 'rxjs'

import { LoginDtoRes } from '../dto/user/login-dto-res'
import { LoginService } from '../service/login.service'

@Injectable()
export class HttpHandlerElearning implements HttpInterceptor {

    constructor(private loginService: LoginService, private messageService: MessageService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const dataLogin: LoginDtoRes | null = this.loginService.getData()
        const reqClone : HttpRequest<any> = req.clone({setHeaders : {'Authorization' : `Bearer ${dataLogin?.data?.token}`}})

        return next.handle(reqClone).pipe(
            tap({
                next: data => {
                    if(data instanceof HttpResponse){
                        if(data.body.msg){
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: `${data.body.msg}`,
                                life: 1000
                            })
                        }
                    }
                },
                error: err => {
                    if(err instanceof HttpErrorResponse){
                        if(err.error.msg){
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Something Bad Happen',
                                detail: `${err.error.msg}`,
                                life: 1000
                            })
                        }else{
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Something Bad Happen',
                                detail: `Error Internal Server`,
                                life: 1000
                            })
                        }

                        if(err.status == 401 && this.router.url != '/login/member'){
                            this.router.navigateByUrl('/login/member')
                        }
                    }
                }
            })
        )
    }
}