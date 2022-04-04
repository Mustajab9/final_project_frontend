
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByPaymentEventIdDtoRes } from '../dto/payment-event/delete-by-payment-event-id-dto-res'
import { GetAllPaymentEventDtoRes } from '../dto/payment-event/get-all-payment-event-dto-res'
import { GetByPaymentEventIdDtoRes } from '../dto/payment-event/get-by-payment-event-id-dto-res'
import { GetPaymentEventByUserDtoRes } from '../dto/payment-event/get-payment-event-by-user-dto-res'
import { InsertPaymentEventDtoReq } from '../dto/payment-event/insert-payment-event-dto-req'
import { InsertPaymentEventDtoRes } from '../dto/payment-event/insert-payment-event-dto-res'
import { UpdatePaymentEventDtoReq } from '../dto/payment-event/update-payment-event-dto-req'
import { UpdatePaymentEventDtoRes } from '../dto/payment-event/update-payment-event-dto-res'

@Injectable({
    providedIn: 'root'
})

export class PaymentEventService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllPaymentEventDtoRes> {
        return this.http.get<GetAllPaymentEventDtoRes>(`http://localhost:8080/payment-events`)
    }

    getById(id: string) : Observable<GetByPaymentEventIdDtoRes> {
        return this.http.get<GetByPaymentEventIdDtoRes>(`http://localhost:8080/payment-events/${id}`)
    }

    getByUser(id: string) : Observable<GetPaymentEventByUserDtoRes> {
        return this.http.get<GetPaymentEventByUserDtoRes>(`http://localhost:8080/payment-events/user/${id}`)
    }

    insert(insertReq: InsertPaymentEventDtoReq, file?: File) : Observable<InsertPaymentEventDtoRes> {
        const formData: FormData = new FormData()
        formData.append('content', JSON.stringify(insertReq))
        if(file){
            formData.append('file', file)
        }
        return this.http.post<InsertPaymentEventDtoRes>(`http://localhost:8080/payment-events`, formData)
    }

    update(updateReq: UpdatePaymentEventDtoReq) : Observable<UpdatePaymentEventDtoRes> {
        return this.http.post<UpdatePaymentEventDtoRes>(`http://localhost:8080/payment-events`, updateReq)
    }

    delete(id: string) : Observable<DeleteByPaymentEventIdDtoRes> {
        return this.http.delete<DeleteByPaymentEventIdDtoRes>(`http://localhost:8080/payment-events/${id}`)
    }
}