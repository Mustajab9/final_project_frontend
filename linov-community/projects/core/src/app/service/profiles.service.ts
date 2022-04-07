
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByProfilesIdDtoRes } from '../dto/profiles/delete-by-profiles-id-dto-res'
import { GetAllProfilesDtoRes } from '../dto/profiles/get-all-profiles-dto-res'
import { GetByProfilesIdDtoRes } from '../dto/profiles/get-by-profiles-id-dto-res'
import { GetProfileByUserDtoRes } from '../dto/profiles/get-profile-by-user-dto-res'
import { InsertProfilesDtoReq } from '../dto/profiles/insert-profiles-dto-req'
import { InsertProfilesDtoRes } from '../dto/profiles/insert-profiles-dto-res'
import { UpdateProfilesDtoReq } from '../dto/profiles/update-profiles-dto-req'
import { UpdateProfilesDtoRes } from '../dto/profiles/update-profiles-dto-res'

@Injectable({
    providedIn: 'root'
})

export class ProfilesService {
    constructor(private http: HttpClient) {
    }

    getAll(): Observable<GetAllProfilesDtoRes> {
        return this.http.get<GetAllProfilesDtoRes>(`http://localhost:8080/profiles`)
    }

    getById(id: string): Observable<GetByProfilesIdDtoRes> {
        return this.http.get<GetByProfilesIdDtoRes>(`http://localhost:8080/profiles/${id}`)
    }

    getByUserId(id: string): Observable<GetProfileByUserDtoRes> {
        return this.http.get<GetProfileByUserDtoRes>(`http://localhost:8080/profiles/user/${id}`)
    }

    insert(insertReq: InsertProfilesDtoReq): Observable<InsertProfilesDtoRes> {
        return this.http.post<InsertProfilesDtoRes>(`http://localhost:8080/profiles`, insertReq)
    }

    update(updateReq: UpdateProfilesDtoReq): Observable<UpdateProfilesDtoRes> {
        return this.http.put<UpdateProfilesDtoRes>(`http://localhost:8080/profiles`, updateReq)
    }

    delete(id: string): Observable<DeleteByProfilesIdDtoRes> {
        return this.http.delete<DeleteByProfilesIdDtoRes>(`http://localhost:8080/profiles/${id}`)
    }
}