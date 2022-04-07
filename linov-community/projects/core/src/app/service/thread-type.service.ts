import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByThreadTypeIdDtoRes } from '../dto/thread-type/delete-by-thread-type-id-dto-res'
import { GetAllThreadTypeDtoRes } from '../dto/thread-type/get-all-thread-type-dto-res'
import { GetByThreadTypeIdDtoRes } from '../dto/thread-type/get-by-thread-type-id-dto-res'
import { InsertThreadTypeDtoReq } from '../dto/thread-type/insert-thread-type-dto-req'
import { InsertThreadTypeDtoRes } from '../dto/thread-type/insert-thread-type-dto-res'
import { UpdateThreadTypeDtoReq } from '../dto/thread-type/update-thread-type-dto-req'
import { UpdateThreadTypeDtoRes } from '../dto/thread-type/update-thread-type-dto-res'

@Injectable({
    providedIn: 'root'
})

export class ThreadTypeService {
    constructor(private http: HttpClient) {
    }

    getAll(startPage?: number, maxPage?: number, query?: string): Observable<GetAllThreadTypeDtoRes> {
        if(startPage || maxPage){
            if (query) {
                return this.http.get<GetAllThreadTypeDtoRes>(`http://localhost:8080/thread-type?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
            } else {
                return this.http.get<GetAllThreadTypeDtoRes>(`http://localhost:8080/thread-type?startPage=${startPage}&maxPage=${maxPage}`)
            }
        }else{
            return this.http.get<GetAllThreadTypeDtoRes>('http://localhost:8080/thread-type')
        }
    }

    getById(id: string): Observable<GetByThreadTypeIdDtoRes> {
        return this.http.get<GetByThreadTypeIdDtoRes>(`http://localhost:8080/thread-types/${id}`)
    }

    insert(insertReq: InsertThreadTypeDtoReq): Observable<InsertThreadTypeDtoRes> {
        return this.http.post<InsertThreadTypeDtoRes>(`http://localhost:8080/thread-types`, insertReq)
    }

    update(updateReq: UpdateThreadTypeDtoReq): Observable<UpdateThreadTypeDtoRes> {
        return this.http.put<UpdateThreadTypeDtoRes>(`http://localhost:8080/thread-types`, updateReq)
    }

    delete(id: string): Observable<DeleteByThreadTypeIdDtoRes> {
        return this.http.delete<DeleteByThreadTypeIdDtoRes>(`http://localhost:8080/thread-types/${id}`)
    }
}