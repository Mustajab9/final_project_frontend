
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { GetByPollingChoiceIdDtoRes } from '../dto/choice-vote/get-by-polling-choice-id-dto-res'
import { DeleteByPollingChoiceIdDtoRes } from '../dto/polling-choice/delete-by-polling-choice-id-dto-res'
import { GetAllPollingChoiceDtoRes } from '../dto/polling-choice/get-all-polling-choice-dto-res'
import { InsertPollingChoiceDtoReq } from '../dto/polling-choice/insert-polling-choice-dto-req'
import { InsertPollingChoiceDtoRes } from '../dto/polling-choice/insert-polling-choice-dto-res'
import { UpdatePollingChoiceDtoReq } from '../dto/polling-choice/update-polling-choice-dto-req'
import { UpdatePollingChoiceDtoRes } from '../dto/polling-choice/update-polling-choice-dto-res'
import { GetByPollingIdDtoRes } from '../dto/polling/get-by-polling-id-dto-res'
import { DeleteByThreadLikeIdDtoRes } from '../dto/thread-like/delete-by-thread-like-id-dto-res'
import { GetAllThreadLikeDtoRes } from '../dto/thread-like/get-all-thread-like-dto-res'
import { GetByThreadLikeIdDtoRes } from '../dto/thread-like/get-by-thread-like-id-dto-res'
import { GetThreadLikeByThreadDtoRes } from '../dto/thread-like/get-thread-like-by-thread-dto-res'
import { InsertThreadLikeDtoReq } from '../dto/thread-like/insert-thread-like-dto-req'
import { InsertThreadLikeDtoRes } from '../dto/thread-like/insert-thread-like-dto-res'

@Injectable({
    providedIn: 'root'
})

export class PollingChoiceService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllPollingChoiceDtoRes> {
        return this.http.get<GetAllPollingChoiceDtoRes>(`http://localhost:8080/polling-choices`)
    }

    getById(id: string) : Observable<GetByPollingChoiceIdDtoRes> {
        return this.http.get<GetByPollingChoiceIdDtoRes>(`http://localhost:8080/polling-choices/${id}`)
    }

    getByCode(id: string) : Observable<GetByPollingIdDtoRes> {
        return this.http.get<GetByPollingIdDtoRes>(`http://localhost:8080/polling-choices/polling/${id}`)
    }

    insert(insertReq: InsertPollingChoiceDtoReq) : Observable<InsertPollingChoiceDtoRes> {
        return this.http.post<InsertPollingChoiceDtoRes>(`http://localhost:8080/polling-choices`, insertReq)
    }

    update(updateReq: UpdatePollingChoiceDtoReq) : Observable<UpdatePollingChoiceDtoRes> {
        return this.http.put<UpdatePollingChoiceDtoRes>(`http://localhost:8080/polling-choices`, updateReq)
    }

    delete(id: string) : Observable<DeleteByPollingChoiceIdDtoRes> {
        return this.http.delete<DeleteByPollingChoiceIdDtoRes>(`http://localhost:8080/polling-choices/${id}`)
    }
}