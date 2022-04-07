import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByPriceListMemberIdDtoRes } from '../dto/price-list-member/delete-by-price-list-member-id-dto-res'
import { GetAllPriceListMemberDtoRes } from '../dto/price-list-member/get-all-price-list-member-dto-res'
import { GetByPriceListMemberIdDtoRes } from '../dto/price-list-member/get-by-price-list-member-id-dto-res'
import { InsertPriceListMemberDtoReq } from '../dto/price-list-member/insert-price-list-member-dto-req'
import { InsertPriceListMemberDtoRes } from '../dto/price-list-member/insert-price-list-member-dto-res'
import { UpdatePriceListMemberDtoReq } from '../dto/price-list-member/update-price-list-member-dto-req'
import { UpdatePriceListMemberDtoRes } from '../dto/price-list-member/update-price-list-member-dto-res'

@Injectable({
    providedIn: 'root'
})

export class PriceListMemberService {
    constructor(private http: HttpClient) {
    }

    getAll(startPage?: number, maxPage?: number, query?: string): Observable<GetAllPriceListMemberDtoRes> {
        if(startPage || maxPage){
            if (query) {
                return this.http.get<GetAllPriceListMemberDtoRes>(`http://localhost:8080/price-list-members?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
            } else {
                return this.http.get<GetAllPriceListMemberDtoRes>(`http://localhost:8080/price-list-members?startPage=${startPage}&maxPage=${maxPage}`)
            }
        }else{
            return this.http.get<GetAllPriceListMemberDtoRes>('http://localhost:8080/price-list-members')
        }
    }

    getById(id: string): Observable<GetByPriceListMemberIdDtoRes> {
        return this.http.get<GetByPriceListMemberIdDtoRes>(`http://localhost:8080/price-list-members/${id}`)
    }

    insert(insertReq: InsertPriceListMemberDtoReq): Observable<InsertPriceListMemberDtoRes> {
        return this.http.post<InsertPriceListMemberDtoRes>(`http://localhost:8080/price-list-members`, insertReq)
    }

    update(updateReq: UpdatePriceListMemberDtoReq): Observable<UpdatePriceListMemberDtoRes> {
        return this.http.put<UpdatePriceListMemberDtoRes>(`http://localhost:8080/price-list-members`, updateReq)
    }

    delete(id: string): Observable<DeleteByPriceListMemberIdDtoRes> {
        return this.http.delete<DeleteByPriceListMemberIdDtoRes>(`http://localhost:8080/price-list-members/${id}`)
    }
}