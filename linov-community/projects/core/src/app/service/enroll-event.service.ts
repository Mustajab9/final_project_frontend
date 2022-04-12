
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByEnrollEventIdDtoRes } from '../dto/enroll-event/delete-by-enroll-event-id-dto-res'
import { GetAllEnrollEventDtoRes } from '../dto/enroll-event/get-all-enroll-event-dto-res'
import { GetByEnrollEventIdDtoRes } from '../dto/enroll-event/get-by-enroll-event-id-dto-res'
import { GetEnrollEventByUserDtoRes } from '../dto/enroll-event/get-enroll-event-by-user-dto-res'
import { InsertEnrollEventDtoReq } from '../dto/enroll-event/insert-enroll-event-dto-req'
import { InsertEnrollEventDtoRes } from '../dto/enroll-event/insert-enroll-event-dto-res'
import { UpdateEnrollEventDtoReq } from '../dto/enroll-event/update-enroll-event-dto-req'
import { UpdateEnrollEventDtoRes } from '../dto/enroll-event/update-enroll-event-dto-res'
import { DeleteByThreadLikeIdDtoRes } from '../dto/thread-like/delete-by-thread-like-id-dto-res'
import { GetAllThreadLikeDtoRes } from '../dto/thread-like/get-all-thread-like-dto-res'
import { GetByThreadLikeIdDtoRes } from '../dto/thread-like/get-by-thread-like-id-dto-res'
import { GetThreadLikeByThreadDtoRes } from '../dto/thread-like/get-thread-like-by-thread-dto-res'
import { InsertThreadLikeDtoReq } from '../dto/thread-like/insert-thread-like-dto-req'
import { InsertThreadLikeDtoRes } from '../dto/thread-like/insert-thread-like-dto-res'

@Injectable({
    providedIn: 'root'
})

export class EnrollEventService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllEnrollEventDtoRes> {
        return this.http.get<GetAllEnrollEventDtoRes>(`http://localhost:8080/enroll-events`)
    }

    getById(id: string) : Observable<GetByEnrollEventIdDtoRes> {
        return this.http.get<GetByEnrollEventIdDtoRes>(`http://localhost:8080/enroll-events/${id}`)
    }

    getByUser(id: string) : Observable<GetEnrollEventByUserDtoRes> {
        return this.http.get<GetEnrollEventByUserDtoRes>(`http://localhost:8080/enroll-events/user/${id}`)
    }

    insert(insertReq: InsertEnrollEventDtoReq, file?: File) : Observable<InsertEnrollEventDtoRes> {
        const formData: FormData = new FormData()
        formData.append('content', JSON.stringify(insertReq))
        if (file) {
            formData.append('file', file)
        }
        return this.http.post<InsertEnrollEventDtoRes>(`http://localhost:8080/enroll-events`, formData)
    }

    update(updateReq: UpdateEnrollEventDtoReq) : Observable<UpdateEnrollEventDtoRes> {
        return this.http.put<UpdateEnrollEventDtoRes>(`http://localhost:8080/enroll-events`, updateReq)
    }

    delete(id: string) : Observable<DeleteByEnrollEventIdDtoRes> {
        return this.http.delete<DeleteByEnrollEventIdDtoRes>(`http://localhost:8080/enroll-events/${id}`)
    }
}