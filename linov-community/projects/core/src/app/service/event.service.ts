
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByEventIdDtoRes } from '../dto/event/delete-by-event-id-dto-res'
import { GetAllEventDtoRes } from '../dto/event/get-all-event-dto-res'
import { GetByEventIdDtoRes } from '../dto/event/get-by-event-id-dto-res'
import { InsertEventDtoReq } from '../dto/event/insert-event-dto-req'
import { InsertEventDtoRes } from '../dto/event/insert-event-dto-res'
import { UpdateEventDtoReq } from '../dto/event/update-event-dto-req'
import { UpdateEventDtoRes } from '../dto/event/update-event-dto-res'
import { DeleteByThreadLikeIdDtoRes } from '../dto/thread-like/delete-by-thread-like-id-dto-res'
import { GetAllThreadLikeDtoRes } from '../dto/thread-like/get-all-thread-like-dto-res'
import { GetByThreadLikeIdDtoRes } from '../dto/thread-like/get-by-thread-like-id-dto-res'
import { GetThreadLikeByThreadDtoRes } from '../dto/thread-like/get-thread-like-by-thread-dto-res'
import { InsertThreadLikeDtoReq } from '../dto/thread-like/insert-thread-like-dto-req'
import { InsertThreadLikeDtoRes } from '../dto/thread-like/insert-thread-like-dto-res'

@Injectable({
    providedIn: 'root'
})

export class EventService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllEventDtoRes> {
        return this.http.get<GetAllEventDtoRes>(`http://localhost:8080/events`)
    }

    getById(id: string) : Observable<GetByEventIdDtoRes> {
        return this.http.get<GetByEventIdDtoRes>(`http://localhost:8080/events/${id}`)
    }

    getByEnroll(id: string) : Observable<GetAllEventDtoRes> {
        return this.http.get<GetAllEventDtoRes>(`http://localhost:8080/events/enroll/${id}`)
    }

    getByNotEnroll(id: string) : Observable<GetAllEventDtoRes> {
        return this.http.get<GetAllEventDtoRes>(`http://localhost:8080/events/not-enroll/${id}`)
    }

    insert(insertReq: InsertEventDtoReq, file?: File) : Observable<InsertEventDtoRes> {
        const formData: FormData = new FormData()
        formData.append('content', JSON.stringify(insertReq))
        if(file){
            formData.append('file', file)
        }
        return this.http.post<InsertEventDtoRes>(`http://localhost:8080/events`, formData)
    }

    update(updateReq: UpdateEventDtoReq) : Observable<UpdateEventDtoRes> {
        return this.http.post<UpdateEventDtoRes>(`http://localhost:8080/events`, updateReq)
    }

    delete(id: string) : Observable<DeleteByEventIdDtoRes> {
        return this.http.delete<DeleteByEventIdDtoRes>(`http://localhost:8080/events/${id}`)
    }
}