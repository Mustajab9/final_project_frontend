
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByThreadCategoryIdDtoRes } from '../dto/thread-category/delete-by-thread-category-id-dto-res'
import { GetAllThreadCategoryDtoRes } from '../dto/thread-category/get-all-thread-category-dto-res'
import { GetByThreadCategoryIdDtoRes } from '../dto/thread-category/get-by-thread-category-id-dto-res'
import { GetThreadCategoryByThreadDtoRes } from '../dto/thread-category/get-thread-category-by-thread-dto-res'
import { InsertThreadCategoryDtoReq } from '../dto/thread-category/insert-thread-category-dto-req'
import { InsertThreadCategoryDtoRes } from '../dto/thread-category/insert-thread-category-dto-res'

@Injectable({
    providedIn: 'root'
})

export class ThreadCategoryService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllThreadCategoryDtoRes> {
        return this.http.get<GetAllThreadCategoryDtoRes>(`http://localhost:8080/thread-categories`)
    }

    getById(id: string) : Observable<GetByThreadCategoryIdDtoRes> {
        return this.http.get<GetByThreadCategoryIdDtoRes>(`http://localhost:8080/thread-categories/${id}`)
    }

    getByThread(id: string) : Observable<GetThreadCategoryByThreadDtoRes> {
        return this.http.get<GetThreadCategoryByThreadDtoRes>(`http://localhost:8080/thread-categories/thread/${id}`)
    }

    insert(insertReq: InsertThreadCategoryDtoReq) : Observable<InsertThreadCategoryDtoRes> {
        return this.http.post<InsertThreadCategoryDtoRes>(`http://localhost:8080/thread-categories`, insertReq)
    }

    delete(id: string) : Observable<DeleteByThreadCategoryIdDtoRes> {
        return this.http.delete<DeleteByThreadCategoryIdDtoRes>(`http://localhost:8080/thread-categories/${id}`)
    }
}