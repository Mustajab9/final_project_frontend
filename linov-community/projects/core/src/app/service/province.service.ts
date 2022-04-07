import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByProvinceIdDtoRes } from '../dto/province/delete-by-province-id-dto-res'
import { GetAllProvinceDtoRes } from '../dto/province/get-all-province-dto-res'
import { GetByProvinceIdDtoRes } from '../dto/province/get-by-province-id-dto-res'
import { InsertProvinceDtoReq } from '../dto/province/insert-province-dto-req'
import { InsertProvinceDtoRes } from '../dto/province/insert-province-dto-res'
import { UpdateProvinceDtoReq } from '../dto/province/update-province-dto-req'
import { UpdateProvinceDtoRes } from '../dto/province/update-province-dto-res'

@Injectable({
    providedIn: 'root'
})

export class ProvinceService {
    constructor(private http: HttpClient) {
    }

    getAll(startPage?: number, maxPage?: number, query?: string): Observable<GetAllProvinceDtoRes> {
        if(startPage || maxPage){
            if (query) {
                return this.http.get<GetAllProvinceDtoRes>(`http://localhost:8080/provinces?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
            } else {
                return this.http.get<GetAllProvinceDtoRes>(`http://localhost:8080/provinces?startPage=${startPage}&maxPage=${maxPage}`)
            }
        }else{
            return this.http.get<GetAllProvinceDtoRes>('http://localhost:8080/provinces')
        }
    }

    getById(id: string): Observable<GetByProvinceIdDtoRes> {
        return this.http.get<GetByProvinceIdDtoRes>(`http://localhost:8080/provinces/${id}`)
    }

    insert(insertReq: InsertProvinceDtoReq): Observable<InsertProvinceDtoRes> {
        return this.http.post<InsertProvinceDtoRes>(`http://localhost:8080/provinces`, insertReq)
    }

    update(updateReq: UpdateProvinceDtoReq): Observable<UpdateProvinceDtoRes> {
        return this.http.put<UpdateProvinceDtoRes>(`http://localhost:8080/provinces`, updateReq)
    }

    delete(id: string): Observable<DeleteByProvinceIdDtoRes> {
        return this.http.delete<DeleteByProvinceIdDtoRes>(`http://localhost:8080/provinces/${id}`)
    }
}