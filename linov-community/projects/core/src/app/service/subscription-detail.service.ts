
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { GetAllSubscriptionDetailDtoRes } from '../dto/subscription-detail/get-all-subscription-detail-dto-res'
import { GetBySubscriptionDetailIdDtoRes } from '../dto/subscription-detail/get-by-subscription-detail-id-dto-res'
import { GetSubscriptionDetailBySubscriptionDtoRes } from '../dto/subscription-detail/get-subscription-detail-by-subscription-dto-res'
import { InsertSubscriptionDetailDtoReq } from '../dto/subscription-detail/insert-subscription-detail-dto-req'
import { InsertSubscriptionDetailDtoRes } from '../dto/subscription-detail/insert-subscription-detail-dto-res'

@Injectable({
    providedIn: 'root'
})

export class ThreadLikeService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllSubscriptionDetailDtoRes> {
        return this.http.get<GetAllSubscriptionDetailDtoRes>(`http://localhost:8080/subscription-details`)
    }

    getById(id: string) : Observable<GetBySubscriptionDetailIdDtoRes> {
        return this.http.get<GetBySubscriptionDetailIdDtoRes>(`http://localhost:8080/subscription-details/${id}`)
    }

    getBySubscription(id: string) : Observable<GetSubscriptionDetailBySubscriptionDtoRes> {
        return this.http.get<GetSubscriptionDetailBySubscriptionDtoRes>(`http://localhost:8080/subscription-details/subscription/${id}`)
    }

    insert(insertReq: InsertSubscriptionDetailDtoReq) : Observable<InsertSubscriptionDetailDtoRes> {
        return this.http.post<InsertSubscriptionDetailDtoRes>(`http://localhost:8080/subscription-details`, insertReq)
    }
}