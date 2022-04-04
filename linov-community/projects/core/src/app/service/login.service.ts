import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, Observer } from 'rxjs'

import { LoginDtoReq } from '../dto/user/login-dto-req'
import { LoginDtoRes } from '../dto/user/login-dto-res'

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    constructor(private http: HttpClient) { }

    login(login: LoginDtoReq): Observable<LoginDtoRes> {
        return this.http.post<LoginDtoRes>('http://localhost:8080/login', login)
    }

    saveData(loginRes: LoginDtoRes): void {
        localStorage.setItem('data', JSON.stringify(loginRes))
    }

    getData(): LoginDtoRes | null {
        const data = localStorage.getItem('data')

        if (data) {
            return JSON.parse(data)
        }

        return null
    }

    clearData(): void {
        localStorage.clear()
    }

}