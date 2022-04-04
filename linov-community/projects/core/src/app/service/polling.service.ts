
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByPollingIdDtoRes } from '../dto/polling/delete-by-polling-id-dto-res'
import { GetAllPollingDtoRes } from '../dto/polling/get-all-polling-dto-res'
import { GetByPollingIdDtoRes } from '../dto/polling/get-by-polling-id-dto-res'
import { GetPollingByThreadIdDtoRes } from '../dto/polling/get-polling-by-thread-id-dto-res'
import { InsertPollingDtoReq } from '../dto/polling/insert-polling-dto-req'
import { InsertPollingDtoRes } from '../dto/polling/insert-polling-dto-res'

@Injectable({
    providedIn: 'root'
})

export class PollingService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllPollingDtoRes> {
        return this.http.get<GetAllPollingDtoRes>(`http://localhost:8080/pollings`)
    }

    getById(id: string) : Observable<GetByPollingIdDtoRes> {
        return this.http.get<GetByPollingIdDtoRes>(`http://localhost:8080/pollings/${id}`)
    }

    getByThread(id: string) : Observable<GetPollingByThreadIdDtoRes> {
        return this.http.get<GetPollingByThreadIdDtoRes>(`http://localhost:8080/pollings/thread/${id}`)
    }

    insert(insertReq: InsertPollingDtoReq) : Observable<InsertPollingDtoRes> {
        return this.http.post<InsertPollingDtoRes>(`http://localhost:8080/pollings`, insertReq)
    }

    delete(id: string) : Observable<DeleteByPollingIdDtoRes> {
        return this.http.delete<DeleteByPollingIdDtoRes>(`http://localhost:8080/pollings/${id}`)
    }
}