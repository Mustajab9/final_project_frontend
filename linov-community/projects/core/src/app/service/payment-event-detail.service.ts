
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { GetAllPaymentEventDetailDtoRes } from '../dto/payment-event-detail/get-all-payment-event-detail-dto-res'
import { GetByPaymentEventDetailIdDtoRes } from '../dto/payment-event-detail/get-by-payment-event-detail-id-dto-res'
import { GetPaymentEventDetailByEventDtoRes } from '../dto/payment-event-detail/get-payment-event-detail-by-event-dto-res'
import { InsertPaymentEventDetailDtoReq } from '../dto/payment-event-detail/insert-payment-event-detail-dto-req'
import { InsertPaymentEventDetailDtoRes } from '../dto/payment-event-detail/insert-payment-event-detail-dto-res'
import { DeleteByThreadLikeIdDtoRes } from '../dto/thread-like/delete-by-thread-like-id-dto-res'
import { GetAllThreadLikeDtoRes } from '../dto/thread-like/get-all-thread-like-dto-res'
import { GetByThreadLikeIdDtoRes } from '../dto/thread-like/get-by-thread-like-id-dto-res'
import { GetThreadLikeByThreadDtoRes } from '../dto/thread-like/get-thread-like-by-thread-dto-res'
import { InsertThreadLikeDtoReq } from '../dto/thread-like/insert-thread-like-dto-req'
import { InsertThreadLikeDtoRes } from '../dto/thread-like/insert-thread-like-dto-res'

@Injectable({
    providedIn: 'root'
})

export class PaymentEventDetailService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllPaymentEventDetailDtoRes> {
        return this.http.get<GetAllPaymentEventDetailDtoRes>(`http://localhost:8080/payment-event-details`)
    }

    getById(id: string) : Observable<GetByPaymentEventDetailIdDtoRes> {
        return this.http.get<GetByPaymentEventDetailIdDtoRes>(`http://localhost:8080/payment-event-details/${id}`)
    }

    getByEvent(id: string) : Observable<GetPaymentEventDetailByEventDtoRes> {
        return this.http.get<GetPaymentEventDetailByEventDtoRes>(`http://localhost:8080/payment-event-details/event/${id}`)
    }

    insert(insertReq: InsertPaymentEventDetailDtoReq) : Observable<InsertPaymentEventDetailDtoRes> {
        return this.http.post<InsertPaymentEventDetailDtoRes>(`http://localhost:8080/payment-event-details`, insertReq)
    }
}