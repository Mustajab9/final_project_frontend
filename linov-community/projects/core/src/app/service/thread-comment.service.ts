
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByThreadCommentIdDtoRes } from '../dto/thread-comment/delete-by-thread-comment-id-dto-res'
import { GetAllThreadCommentDtoRes } from '../dto/thread-comment/get-all-thread-comment-dto-res'
import { GetByThreadCommentIdDtoRes } from '../dto/thread-comment/get-by-thread-comment-id-dto-res'
import { GetThreadCommentByThreadDtoRes } from '../dto/thread-comment/get-thread-comment-by-thread-dto-res'
import { InsertThreadCommentDtoReq } from '../dto/thread-comment/insert-thread-comment-dto-req'
import { InsertThreadCommentDtoRes } from '../dto/thread-comment/insert-thread-comment-dto-res'

@Injectable({
    providedIn: 'root'
})

export class ThreadCommentService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllThreadCommentDtoRes> {
        return this.http.get<GetAllThreadCommentDtoRes>(`http://localhost:8080/thread-comments`)
    }

    getById(id: string) : Observable<GetByThreadCommentIdDtoRes> {
        return this.http.get<GetByThreadCommentIdDtoRes>(`http://localhost:8080/thread-comments/${id}`)
    }

    getByThread(id: string) : Observable<GetThreadCommentByThreadDtoRes> {
        return this.http.get<GetThreadCommentByThreadDtoRes>(`http://localhost:8080/thread-comments/thread/${id}`)
    }

    insert(insertReq: InsertThreadCommentDtoReq) : Observable<InsertThreadCommentDtoRes> {
        return this.http.post<InsertThreadCommentDtoRes>(`http://localhost:8080/thread-comments`, insertReq)
    }

    delete(id: string) : Observable<DeleteByThreadCommentIdDtoRes> {
        return this.http.delete<DeleteByThreadCommentIdDtoRes>(`http://localhost:8080/thread-comments/${id}`)
    }
}