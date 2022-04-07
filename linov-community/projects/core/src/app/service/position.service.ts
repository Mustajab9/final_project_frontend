import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByPositionIdDtoRes } from '../dto/position/delete-by-position-id-dto-res'
import { GetAllPositionDtoRes } from '../dto/position/get-all-position-dto-res'
import { GetByPositionIdDtoRes } from '../dto/position/get-by-position-id-dto-res'
import { InsertPositionDtoReq } from '../dto/position/insert-position-dto-req'
import { InsertPositionDtoRes } from '../dto/position/insert-position-dto-res'
import { UpdatePositionDtoReq } from '../dto/position/update-position-dto-req'
import { UpdatePositionDtoRes } from '../dto/position/update-position-dto-res'

@Injectable({
    providedIn: 'root'
})

export class PositionService {
    constructor(private http: HttpClient) {
    }

    getAll(startPage?: number, maxPage?: number, query?: string): Observable<GetAllPositionDtoRes> {
        if(startPage || maxPage){
            if (query) {
                return this.http.get<GetAllPositionDtoRes>(`http://localhost:8080/positions?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
            } else {
                return this.http.get<GetAllPositionDtoRes>(`http://localhost:8080/positions?startPage=${startPage}&maxPage=${maxPage}`)
            }
        }else{
            return this.http.get<GetAllPositionDtoRes>('http://localhost:8080/positions')
        }
    }

    getById(id: string): Observable<GetByPositionIdDtoRes> {
        return this.http.get<GetByPositionIdDtoRes>(`http://localhost:8080/positions/${id}`)
    }

    insert(insertReq: InsertPositionDtoReq): Observable<InsertPositionDtoRes> {
        return this.http.post<InsertPositionDtoRes>(`http://localhost:8080/positions`, insertReq)
    }

    update(updateReq: UpdatePositionDtoReq): Observable<UpdatePositionDtoRes> {
        return this.http.put<UpdatePositionDtoRes>(`http://localhost:8080/positions`, updateReq)
    }

    delete(id: string): Observable<DeleteByPositionIdDtoRes> {
        return this.http.delete<DeleteByPositionIdDtoRes>(`http://localhost:8080/positions/${id}`)
    }
}