import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByIndustryIdDtoRes } from '../dto/industry/delete-by-industry-id-dto-res'
import { GetAllIndustryDtoRes } from '../dto/industry/get-all-industry-dto-res'
import { GetByIndustryIdDtoRes } from '../dto/industry/get-by-industry-id-dto-res'
import { InsertIndustryDtoReq } from '../dto/industry/insert-industry-dto-req'
import { InsertIndustryDtoRes } from '../dto/industry/insert-industry-dto-res'
import { UpdateIndustryDtoReq } from '../dto/industry/update-industry-dto-req'
import { UpdateIndustryDtoRes } from '../dto/industry/update-industry-dto-res'

@Injectable({
    providedIn: 'root'
})

export class IndustryService {
    constructor(private http: HttpClient) {
    }

    getAll(startPage?: number, maxPage?: number, query?: string): Observable<GetAllIndustryDtoRes> {
        if(startPage || maxPage){
            if (query) {
                return this.http.get<GetAllIndustryDtoRes>(`http://localhost:8080/industries?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
            } else {
                return this.http.get<GetAllIndustryDtoRes>(`http://localhost:8080/industries?startPage=${startPage}&maxPage=${maxPage}`)
            }
        }else{
            return this.http.get<GetAllIndustryDtoRes>('http://localhost:8080/industries')
        }
    }

    getById(id: string): Observable<GetByIndustryIdDtoRes> {
        return this.http.get<GetByIndustryIdDtoRes>(`http://localhost:8080/industries/${id}`)
    }

    insert(insertReq: InsertIndustryDtoReq): Observable<InsertIndustryDtoRes> {
        return this.http.post<InsertIndustryDtoRes>(`http://localhost:8080/industries`, insertReq)
    }

    update(updateReq: UpdateIndustryDtoReq): Observable<UpdateIndustryDtoRes> {
        return this.http.put<UpdateIndustryDtoRes>(`http://localhost:8080/industries`, updateReq)
    }

    delete(id: string): Observable<DeleteByIndustryIdDtoRes> {
        return this.http.delete<DeleteByIndustryIdDtoRes>(`http://localhost:8080/industries/${id}`)
    }
}