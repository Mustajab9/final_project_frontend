
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByBookmarkIdDtoRes } from '../dto/bookmark/delete-by-bookmark-id-dto-res'
import { GetAllBookmarkDtoRes } from '../dto/bookmark/get-all-bookmark-dto-res'
import { GetBookmarkByUserAndThreadDtoRes } from '../dto/bookmark/get-bookmark-by-user-and-thread-dto-res'
import { GetBookmarkByUserDtoRes } from '../dto/bookmark/get-bookmark-by-user-dto-res'
import { GetByBookmarkIdDtoRes } from '../dto/bookmark/get-by-bookmark-id-dto-res'
import { InsertBookmarkDtoReq } from '../dto/bookmark/insert-bookmark-dto-req'
import { InsertBookmarkDtoRes } from '../dto/bookmark/insert-bookmark-dto-res'

@Injectable({
    providedIn: 'root'
})

export class BookmarkService {
    constructor(private http: HttpClient) {
    }

    getAll(): Observable<GetAllBookmarkDtoRes> {
        return this.http.get<GetAllBookmarkDtoRes>(`http://localhost:8080/bookmarks`)
    }

    getById(id: string): Observable<GetByBookmarkIdDtoRes> {
        return this.http.get<GetByBookmarkIdDtoRes>(`http://localhost:8080/bookmarks/${id}`)
    }

    getByUser(): Observable<GetBookmarkByUserDtoRes> {
        return this.http.get<GetBookmarkByUserDtoRes>(`http://localhost:8080/bookmarks/user`)
    }

    getByUserAndThread(threadId: string, userId?: string): Observable<GetBookmarkByUserAndThreadDtoRes> {
        return this.http.get<GetBookmarkByUserAndThreadDtoRes>(`http://localhost:8080/bookmarks/user/${userId}/${threadId}`)
    }

    insert(insertReq: InsertBookmarkDtoReq): Observable<InsertBookmarkDtoRes> {
        return this.http.post<InsertBookmarkDtoRes>(`http://localhost:8080/bookmarks`, insertReq)
    }

    delete(id: string): Observable<DeleteByBookmarkIdDtoRes> {
        return this.http.delete<DeleteByBookmarkIdDtoRes>(`http://localhost:8080/bookmarks/${id}`)
    }
}