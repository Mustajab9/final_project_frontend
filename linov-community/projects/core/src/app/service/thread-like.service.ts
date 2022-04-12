
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByThreadLikeIdDtoRes } from '../dto/thread-like/delete-by-thread-like-id-dto-res'
import { GetAllThreadLikeDtoRes } from '../dto/thread-like/get-all-thread-like-dto-res'
import { GetByThreadLikeIdDtoRes } from '../dto/thread-like/get-by-thread-like-id-dto-res'
import { GetByUserIdDtoDataRes } from '../dto/thread-like/get-by-user-id-dto-data-res'
import { GetByUserIdDtoRes } from '../dto/thread-like/get-by-user-id-dto-res'
import { GetThreadLikeByThreadDtoRes } from '../dto/thread-like/get-thread-like-by-thread-dto-res'
import { InsertThreadLikeDtoReq } from '../dto/thread-like/insert-thread-like-dto-req'
import { InsertThreadLikeDtoRes } from '../dto/thread-like/insert-thread-like-dto-res'

@Injectable({
    providedIn: 'root'
})

export class ThreadLikeService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllThreadLikeDtoRes> {
        return this.http.get<GetAllThreadLikeDtoRes>(`http://localhost:8080/thread-likes`)
    }

    getById(id: string) : Observable<GetByThreadLikeIdDtoRes> {
        return this.http.get<GetByThreadLikeIdDtoRes>(`http://localhost:8080/thread-likes/${id}`)
    }

    getByThread(id: string) : Observable<GetThreadLikeByThreadDtoRes> {
        return this.http.get<GetThreadLikeByThreadDtoRes>(`http://localhost:8080/thread-likes/thread/${id}`)
    }

    getByThreadAndUser(threadId: string, userId?: string) : Observable<GetThreadLikeByThreadDtoRes> {
        return this.http.get<GetThreadLikeByThreadDtoRes>(`http://localhost:8080/thread-likes/thread/${userId}/${threadId}`)
    }

    getByUser() : Observable<GetByUserIdDtoRes> {
        return this.http.get<GetByUserIdDtoRes>(`http://localhost:8080/thread-likes/user`)
    }

    insert(insertReq: InsertThreadLikeDtoReq) : Observable<InsertThreadLikeDtoRes> {
        return this.http.post<InsertThreadLikeDtoRes>(`http://localhost:8080/thread-likes`, insertReq)
    }

    delete(id: string) : Observable<DeleteByThreadLikeIdDtoRes> {
        return this.http.delete<DeleteByThreadLikeIdDtoRes>(`http://localhost:8080/thread-likes/${id}`)
    }
}