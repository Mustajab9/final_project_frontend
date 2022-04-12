
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByProfileSosmedIdDtoRes } from '../dto/profile-sosmed/delete-by-profile-sosmed-id-dto-res'
import { GetAllProfileSosmedDtoRes } from '../dto/profile-sosmed/get-all-profile-sosmed-dto-res'
import { GetByProfileSosmedIdDtoRes } from '../dto/profile-sosmed/get-by-profile-sosmed-id-dto-res'
import { GetProfileSosmedByUserDtoRes } from '../dto/profile-sosmed/get-profile-sosmed-by-user-dto-res'
import { InsertProfileSosmedDtoReq } from '../dto/profile-sosmed/insert-profile-sosmed-dto-req'
import { InsertProfileSosmedDtoRes } from '../dto/profile-sosmed/insert-profile-sosmed-dto-res'
import { UpdateProfileSosmedDtoReq } from '../dto/profile-sosmed/update-profile-sosmed-dto-req'
import { UpdateProfileSosmedDtoRes } from '../dto/profile-sosmed/update-profile-sosmed-dto-res'

@Injectable({
    providedIn: 'root'
})

export class ProfileSosmedService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllProfileSosmedDtoRes> {
        return this.http.get<GetAllProfileSosmedDtoRes>(`http://localhost:8080/profile-sosmeds`)
    }

    getById(id: string) : Observable<GetByProfileSosmedIdDtoRes> {
        return this.http.get<GetByProfileSosmedIdDtoRes>(`http://localhost:8080/profile-sosmeds/${id}`)
    }

    getByUser(): Observable<GetProfileSosmedByUserDtoRes> {
        return this.http.get<GetProfileSosmedByUserDtoRes>(`http://localhost:8080/profile-sosmeds/user`)
    }

    insert(insertReq: InsertProfileSosmedDtoReq) : Observable<InsertProfileSosmedDtoRes> {
        return this.http.post<InsertProfileSosmedDtoRes>(`http://localhost:8080/profile-sosmeds`, insertReq)
    }

    update(updateReq: UpdateProfileSosmedDtoReq) : Observable<UpdateProfileSosmedDtoRes> {
        return this.http.put<UpdateProfileSosmedDtoRes>(`http://localhost:8080/profile-sosmeds`, updateReq)
    }

    delete(id: string) : Observable<DeleteByProfileSosmedIdDtoRes> {
        return this.http.delete<DeleteByProfileSosmedIdDtoRes>(`http://localhost:8080/profile-sosmeds/${id}`)
    }
}