import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ChangePasswordDtoReq } from '../dto/user/change-password-dto-req'
import { DeleteByUserIdDtoRes } from '../dto/user/delete-by-user-id-dto-res'
import { GetAllUserDtoRes } from '../dto/user/get-all-user-dto-res'
import { GetByUserIdDtoRes } from '../dto/user/get-by-user-id-dto-res'
import { GetUserByEmailDtoDataRes } from '../dto/user/get-user-by-email-dto-data-res'
import { InsertUserDtoReq } from '../dto/user/insert-user-dto-req'
import { InsertUserDtoRes } from '../dto/user/insert-user-dto-res'
import { UpdateUserDtoReq } from '../dto/user/update-user-dto-req'
import { UpdateUserDtoRes } from '../dto/user/update-user-dto-res'

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) {
    }

    getAll(startPage?: number, maxPage?: number, query?: string): Observable<GetAllUserDtoRes> {
        if(startPage || maxPage){
            if (query) {
                return this.http.get<GetAllUserDtoRes>(`http://localhost:8080/users?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
            } else {
                return this.http.get<GetAllUserDtoRes>(`http://localhost:8080/users?startPage=${startPage}&maxPage=${maxPage}`)
            }
        }else{
            return this.http.get<GetAllUserDtoRes>('http://localhost:8080/users')
        }
    }

    getById(id: string | undefined): Observable<GetByUserIdDtoRes> {
        return this.http.get<GetByUserIdDtoRes>(`http://localhost:8080/users/${id}`)
    }

    getByEmail(email: string): Observable<GetUserByEmailDtoDataRes> {
        return this.http.get<GetUserByEmailDtoDataRes>(`http://localhost:8080/users/user-${email}`)
    }

    insert(insertReq: InsertUserDtoReq): Observable<InsertUserDtoRes> {
        return this.http.post<InsertUserDtoRes>(`http://localhost:8080/users`, insertReq)
    }

    update(updateReq: UpdateUserDtoReq): Observable<UpdateUserDtoRes> {
        return this.http.put<UpdateUserDtoRes>(`http://localhost:8080/users`, updateReq)
    }

    forgotPassword(updateReq: UpdateUserDtoReq): Observable<UpdateUserDtoRes> {
        return this.http.put<UpdateUserDtoRes>(`http://localhost:8080/users/forgot-password`, updateReq)
    }

    changePassword(updateReq: ChangePasswordDtoReq): Observable<UpdateUserDtoRes> {
        return this.http.put<UpdateUserDtoRes>(`http://localhost:8080/users/change-password`, updateReq)
    }

    delete(id: string): Observable<DeleteByUserIdDtoRes> {
        return this.http.delete<DeleteByUserIdDtoRes>(`http://localhost:8080/users/${id}`)
    }
}