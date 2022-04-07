import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByRegencyIdDtoRes } from '../dto/regency/delete-by-regency-id-dto-res'
import { GetAllRegencyDtoRes } from '../dto/regency/get-all-regency-dto-res'
import { GetByRegencyIdDtoRes } from '../dto/regency/get-by-regency-id-dto-res'
import { InsertRegencyDtoReq } from '../dto/regency/insert-regency-dto-req'
import { InsertRegencyDtoRes } from '../dto/regency/insert-regency-dto-res'
import { UpdateRegencyDtoReq } from '../dto/regency/update-regency-dto-req'
import { UpdateRegencyDtoRes } from '../dto/regency/update-regency-dto-res'

@Injectable({
    providedIn: 'root'
})

export class RegencyService {
    constructor(private http: HttpClient) {
    }

    getAll(startPage?: number, maxPage?: number, query?: string): Observable<GetAllRegencyDtoRes> {
        if(startPage || maxPage){
            if (query) {
                return this.http.get<GetAllRegencyDtoRes>(`http://localhost:8080/regencies?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
            } else {
                return this.http.get<GetAllRegencyDtoRes>(`http://localhost:8080/regencies?startPage=${startPage}&maxPage=${maxPage}`)
            }
        }else{
            return this.http.get<GetAllRegencyDtoRes>('http://localhost:8080/regencies')
        }
    }

    getById(id: string): Observable<GetByRegencyIdDtoRes> {
        return this.http.get<GetByRegencyIdDtoRes>(`http://localhost:8080/regencies/${id}`)
    }

    insert(insertReq: InsertRegencyDtoReq): Observable<InsertRegencyDtoRes> {
        return this.http.post<InsertRegencyDtoRes>(`http://localhost:8080/regencies`, insertReq)
    }

    update(updateReq: UpdateRegencyDtoReq): Observable<UpdateRegencyDtoRes> {
        return this.http.put<UpdateRegencyDtoRes>(`http://localhost:8080/regencies`, updateReq)
    }

    delete(id: string): Observable<DeleteByRegencyIdDtoRes> {
        return this.http.delete<DeleteByRegencyIdDtoRes>(`http://localhost:8080/regencies/${id}`)
    }
}