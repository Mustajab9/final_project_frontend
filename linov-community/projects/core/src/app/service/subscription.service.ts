import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteBySubscriptionIdDtoRes } from '../dto/subscription/delete-by-subscription-id-dto-res'
import { GetAllSubscriptionDtoRes } from '../dto/subscription/get-all-subscription-dto-res'
import { GetBySubscriptionIdDtoRes } from '../dto/subscription/get-by-subscription-id-dto-res'
import { InsertSubscriptionDtoReq } from '../dto/subscription/insert-subscription-dto-req'
import { InsertSubscriptionDtoRes } from '../dto/subscription/insert-subscription-dto-res'
import { UpdateSubscriptionDtoReq } from '../dto/subscription/update-subscription-dto-req'
import { UpdateSubscriptionDtoRes } from '../dto/subscription/update-subscription-dto-res'

@Injectable({
    providedIn: 'root'
})

export class SubscriptionService {
    constructor(private http: HttpClient) {
    }

    getAll(startPage?: number, maxPage?: number, query?: string): Observable<GetAllSubscriptionDtoRes> {
        if(startPage || maxPage){
            if (query) {
                return this.http.get<GetAllSubscriptionDtoRes>(`http://localhost:8080/subscriptions?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
            } else {
                return this.http.get<GetAllSubscriptionDtoRes>(`http://localhost:8080/subscriptions?startPage=${startPage}&maxPage=${maxPage}`)
            }
        }else{
            return this.http.get<GetAllSubscriptionDtoRes>('http://localhost:8080/subscriptions')
        }
    }

    getById(id: string): Observable<GetBySubscriptionIdDtoRes> {
        return this.http.get<GetBySubscriptionIdDtoRes>(`http://localhost:8080/subscriptions/${id}`)
    }

    insert(insertReq: InsertSubscriptionDtoReq): Observable<InsertSubscriptionDtoRes> {
        return this.http.post<InsertSubscriptionDtoRes>(`http://localhost:8080/subscriptions`, insertReq)
    }

    update(updateReq: UpdateSubscriptionDtoReq): Observable<UpdateSubscriptionDtoRes> {
        return this.http.put<UpdateSubscriptionDtoRes>(`http://localhost:8080/subscriptions`, updateReq)
    }

    delete(id: string): Observable<DeleteBySubscriptionIdDtoRes> {
        return this.http.delete<DeleteBySubscriptionIdDtoRes>(`http://localhost:8080/subscriptions/${id}`)
    }
}