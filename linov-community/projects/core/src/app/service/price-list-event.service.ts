import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByPriceListEventIdDtoRes } from '../dto/price-list-event/delete-by-price-list-event-id-dto-res'
import { GetAllPriceListEventDtoRes } from '../dto/price-list-event/get-all-price-list-event-dto-res'
import { GetByPriceListEventIdDtoRes } from '../dto/price-list-event/get-by-price-list-event-id-dto-res'
import { InsertPriceListEventDtoReq } from '../dto/price-list-event/insert-price-list-event-dto-req'
import { InsertPriceListEventDtoRes } from '../dto/price-list-event/insert-price-list-event-dto-res'
import { UpdatePriceListEventDtoReq } from '../dto/price-list-event/update-price-list-event-dto-req'
import { UpdatePriceListEventDtoRes } from '../dto/price-list-event/update-price-list-event-dto-res'

@Injectable({
    providedIn: 'root'
})

export class PriceListEventService {
    constructor(private http: HttpClient){
    }

    getAll(query: string, startPage: number, maxPage: number) : Observable<GetAllPriceListEventDtoRes> {
        return this.http.get<GetAllPriceListEventDtoRes>(`http://localhost:8080/price-list-events?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
    }

    getById(id: string) : Observable<GetByPriceListEventIdDtoRes> {
        return this.http.get<GetByPriceListEventIdDtoRes>(`http://localhost:8080/price-list-events/${id}`)
    }

    insert(insertReq: InsertPriceListEventDtoReq) : Observable<InsertPriceListEventDtoRes> {
        return this.http.post<InsertPriceListEventDtoRes>(`http://localhost:8080/price-list-events`, insertReq)
    }

    update(updateReq: UpdatePriceListEventDtoReq): Observable<UpdatePriceListEventDtoRes> {
        return this.http.put<UpdatePriceListEventDtoRes>(`http://localhost:8080/price-list-events`, updateReq)
    }

    delete(id: string) : Observable<DeleteByPriceListEventIdDtoRes> {
        return this.http.delete<DeleteByPriceListEventIdDtoRes>(`http://localhost:8080/price-list-events/${id}`)
    }
}