import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByPaymentMethodIdDtoRes } from '../dto/payment-method/delete-by-payment-method-id-dto-res'
import { GetAllPaymentMethodDtoRes } from '../dto/payment-method/get-all-payment-method-dto-res'
import { GetByPaymentMethodIdDtoRes } from '../dto/payment-method/get-by-payment-method-id-dto-res'
import { InsertPaymentMethodDtoReq } from '../dto/payment-method/insert-payment-method-dto-req'
import { InsertPaymentMethodDtoRes } from '../dto/payment-method/insert-payment-method-dto-res'
import { UpdatePaymentMethodDtoReq } from '../dto/payment-method/update-payment-method-dto-req'
import { UpdatePaymentMethodDtoRes } from '../dto/payment-method/update-payment-method-dto-res'

@Injectable({
    providedIn: 'root'
})

export class PaymentMethodService {
    constructor(private http: HttpClient) {
    }

    getAll(startPage?: number, maxPage?: number, query?: string): Observable<GetAllPaymentMethodDtoRes> {
        if(startPage || maxPage){
            if (query) {
                return this.http.get<GetAllPaymentMethodDtoRes>(`http://localhost:8080/payment-methods?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
            } else {
                return this.http.get<GetAllPaymentMethodDtoRes>(`http://localhost:8080/payment-methods?startPage=${startPage}&maxPage=${maxPage}`)
            }
        }else{
            return this.http.get<GetAllPaymentMethodDtoRes>('http://localhost:8080/payment-methods')
        }
    }

    getById(id: string): Observable<GetByPaymentMethodIdDtoRes> {
        return this.http.get<GetByPaymentMethodIdDtoRes>(`http://localhost:8080/payment-methods/${id}`)
    }

    insert(insertReq: InsertPaymentMethodDtoReq): Observable<InsertPaymentMethodDtoRes> {
        return this.http.post<InsertPaymentMethodDtoRes>(`http://localhost:8080/payment-methods`, insertReq)
    }

    update(updateReq: UpdatePaymentMethodDtoReq): Observable<UpdatePaymentMethodDtoRes> {
        return this.http.put<UpdatePaymentMethodDtoRes>(`http://localhost:8080/payment-methods`, updateReq)
    }

    delete(id: string): Observable<DeleteByPaymentMethodIdDtoRes> {
        return this.http.delete<DeleteByPaymentMethodIdDtoRes>(`http://localhost:8080/payment-methods/${id}`)
    }
}