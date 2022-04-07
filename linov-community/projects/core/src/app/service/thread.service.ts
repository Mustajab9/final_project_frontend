import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByThreadIdDtoRes } from '../dto/thread/delete-by-thread-id-dto-res'
import { GetAllThreadDtoRes } from '../dto/thread/get-all-thread-dto-res'
import { GetByThreadIdDtoRes } from '../dto/thread/get-by-thread-id-dto-res'
import { GetThreadByCategoryDtoRes } from '../dto/thread/get-thread-by-category-dto-res'
import { GetThreadByUserDtoRes } from '../dto/thread/get-thread-by-user-dto-res'
import { InsertThreadDtoReq } from '../dto/thread/insert-thread-dto-req'
import { InsertThreadDtoRes } from '../dto/thread/insert-thread-dto-res'
import { UpdateThreadDtoReq } from '../dto/thread/update-thread-dto-req'
import { UpdateThreadDtoRes } from '../dto/thread/update-thread-dto-res'
import { DeleteByUserIdDtoRes } from '../dto/user/delete-by-user-id-dto-res'
import { GetAllUserDtoRes } from '../dto/user/get-all-user-dto-res'
import { GetByUserIdDtoRes } from '../dto/user/get-by-user-id-dto-res'
import { InsertUserDtoReq } from '../dto/user/insert-user-dto-req'
import { InsertUserDtoRes } from '../dto/user/insert-user-dto-res'
import { UpdateUserDtoReq } from '../dto/user/update-user-dto-req'
import { UpdateUserDtoRes } from '../dto/user/update-user-dto-res'

@Injectable({
    providedIn: 'root'
})

export class ThreadService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllThreadDtoRes> {
        return this.http.get<GetAllThreadDtoRes>('http://localhost:8080/threads')
    }

    getById(id: string) : Observable<GetByThreadIdDtoRes> {
        return this.http.get<GetByThreadIdDtoRes>(`http://localhost:8080/threads/${id}`)
    }

    getByUser(id: string) : Observable<GetThreadByUserDtoRes> {
        return this.http.get<GetThreadByUserDtoRes>(`http://localhost:8080/threads/user/${id}`)
    }

    getByCategory(id: number[]) : Observable<GetThreadByCategoryDtoRes> {
        return this.http.get<GetThreadByCategoryDtoRes>(`http://localhost:8080/threads/category/${id}`)
    }

    insert(insertReq: InsertThreadDtoReq, files: any[]) : Observable<InsertThreadDtoRes> {
        const formData: FormData = new FormData()
        formData.append('content', JSON.stringify(insertReq))
        if(files){
            for(let file of files){
                formData.append('file', file)
            }
        }
        return this.http.post<InsertThreadDtoRes>(`http://localhost:8080/threads`, formData)
    }

    update(updateReq: UpdateThreadDtoReq): Observable<UpdateThreadDtoRes> {
        return this.http.put<UpdateThreadDtoRes>(`http://localhost:8080/threads`, updateReq)
    }

    delete(id: string) : Observable<DeleteByThreadIdDtoRes> {
        return this.http.delete<DeleteByThreadIdDtoRes>(`http://localhost:8080/threads/${id}`)
    }
}