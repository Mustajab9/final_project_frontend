import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByEventTypeIdDtoRes } from '../dto/event-type/delete-by-event-type-id-dto-res'
import { GetAllEventTypeDtoRes } from '../dto/event-type/get-all-event-type-dto-res'
import { GetByEventTypeIdDtoRes } from '../dto/event-type/get-by-event-type-id-dto-res'
import { InsertEventTypeDtoReq } from '../dto/event-type/insert-event-type-dto-req'
import { InsertEventTypeDtoRes } from '../dto/event-type/insert-event-type-dto-res'
import { UpdateEventTypeDtoReq } from '../dto/event-type/update-event-type-dto-req'
import { UpdateEventTypeDtoRes } from '../dto/event-type/update-event-type-dto-res'

@Injectable({
    providedIn: 'root'
})

export class EventTypeService {
    constructor(private http: HttpClient){
    }

    getAll(query: string, startPage: number, maxPage: number) : Observable<GetAllEventTypeDtoRes> {
        return this.http.get<GetAllEventTypeDtoRes>(`http://localhost:8080/event-types?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
    }

    getById(id: string) : Observable<GetByEventTypeIdDtoRes> {
        return this.http.get<GetByEventTypeIdDtoRes>(`http://localhost:8080/event-types/${id}`)
    }

    insert(insertReq: InsertEventTypeDtoReq) : Observable<InsertEventTypeDtoRes> {
        return this.http.post<InsertEventTypeDtoRes>(`http://localhost:8080/event-types`, insertReq)
    }

    update(updateReq: UpdateEventTypeDtoReq): Observable<UpdateEventTypeDtoRes> {
        return this.http.put<UpdateEventTypeDtoRes>(`http://localhost:8080/event-types`, updateReq)
    }

    delete(id: string) : Observable<DeleteByEventTypeIdDtoRes> {
        return this.http.delete<DeleteByEventTypeIdDtoRes>(`http://localhost:8080/event-types/${id}`)
    }
}