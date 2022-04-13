
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByEventIdDtoRes } from '../dto/event/delete-by-event-id-dto-res'
import { GetAllEventDtoRes } from '../dto/event/get-all-event-dto-res'
import { GetByEventIdDtoRes } from '../dto/event/get-by-event-id-dto-res'
import { GetCountNotPaidDtoDataRes } from '../dto/event/get-count-not-paid-dto-data-res'
import { InsertEventDtoReq } from '../dto/event/insert-event-dto-req'
import { InsertEventDtoRes } from '../dto/event/insert-event-dto-res'
import { UpdateEventDtoReq } from '../dto/event/update-event-dto-req'
import { UpdateEventDtoRes } from '../dto/event/update-event-dto-res'

@Injectable({
    providedIn: 'root'
})

export class EventService {
    constructor(private http: HttpClient) {
    }

    getAll(startPage?: number, maxPage?: number, query?: string): Observable<GetAllEventDtoRes> {
        if (startPage || maxPage) {
            if (query) {
                return this.http.get<GetAllEventDtoRes>(`http://localhost:8080/events?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
            } else {
                return this.http.get<GetAllEventDtoRes>(`http://localhost:8080/events?startPage=${startPage}&maxPage=${maxPage}`)
            }
        } else {
            return this.http.get<GetAllEventDtoRes>(`http://localhost:8080/events`)
        }
    }

    getById(id: string): Observable<GetByEventIdDtoRes> {
        return this.http.get<GetByEventIdDtoRes>(`http://localhost:8080/events/${id}`)
    }

    getByEnroll(id: string): Observable<GetAllEventDtoRes> {
        return this.http.get<GetAllEventDtoRes>(`http://localhost:8080/events/enroll/${id}`)
    }

    getByNotEnroll(): Observable<GetAllEventDtoRes> {
        return this.http.get<GetAllEventDtoRes>(`http://localhost:8080/events/not-enroll`)
    }

    getEnrollStatus(id: string, isApprove: boolean): Observable<GetAllEventDtoRes> {
        return this.http.get<GetAllEventDtoRes>(`http://localhost:8080/events/enroll-status/${id}/${isApprove}`)
    }

    getEventStatus(id: string): Observable<GetByEventIdDtoRes> {
        return this.http.get<GetByEventIdDtoRes>(`http://localhost:8080/events/event-not-approve/${id}`)
    }

    getEventNotPaid(id?: string): Observable<GetAllEventDtoRes> {
        return this.http.get<GetAllEventDtoRes>(`http://localhost:8080/events/event-not-paid/${id}`)
    }

    getCountNotPaid(): Observable<GetCountNotPaidDtoDataRes> {
        return this.http.get<GetCountNotPaidDtoDataRes>(`http://localhost:8080/events/count-not-paid`)
    }

    insert(insertReq: InsertEventDtoReq, file?: File): Observable<InsertEventDtoRes> {
        const formData: FormData = new FormData()
        formData.append('content', JSON.stringify(insertReq))
        if (file) {
            formData.append('file', file)
        }
        return this.http.post<InsertEventDtoRes>(`http://localhost:8080/events`, formData)
    }

    update(updateReq: UpdateEventDtoReq): Observable<UpdateEventDtoRes> {
        return this.http.put<UpdateEventDtoRes>(`http://localhost:8080/events`, updateReq)
    }

    delete(id: string): Observable<DeleteByEventIdDtoRes> {
        return this.http.delete<DeleteByEventIdDtoRes>(`http://localhost:8080/events/${id}`)
    }
}