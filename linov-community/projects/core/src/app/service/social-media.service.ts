import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteBySocialMediaIdDtoRes } from '../dto/social-media/delete-by-social-media-id-dto-res'
import { GetAllSocialMediaDtoRes } from '../dto/social-media/get-all-social-media-dto-res'
import { GetBySocialMediaIdDtoRes } from '../dto/social-media/get-by-social-media-id-dto-res'
import { InsertSocialMediaDtoReq } from '../dto/social-media/insert-social-media-dto-req'
import { InsertSocialMediaDtoRes } from '../dto/social-media/insert-social-media-dto-res'
import { UpdateSocialMediaDtoReq } from '../dto/social-media/update-social-media-dto-req'
import { UpdateSocialMediaDtoRes } from '../dto/social-media/update-social-media-dto-res'

@Injectable({
    providedIn: 'root'
})

export class SocialMediaService {
    constructor(private http: HttpClient){
    }

    getAll(query: string, startPage: number, maxPage: number) : Observable<GetAllSocialMediaDtoRes> {
        return this.http.get<GetAllSocialMediaDtoRes>(`http://localhost:8080/social-medias?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
    }

    getById(id: string) : Observable<GetBySocialMediaIdDtoRes> {
        return this.http.get<GetBySocialMediaIdDtoRes>(`http://localhost:8080/social-medias/${id}`)
    }

    insert(insertReq: InsertSocialMediaDtoReq) : Observable<InsertSocialMediaDtoRes> {
        return this.http.post<InsertSocialMediaDtoRes>(`http://localhost:8080/social-medias`, insertReq)
    }

    update(updateReq: UpdateSocialMediaDtoReq): Observable<UpdateSocialMediaDtoRes> {
        return this.http.put<UpdateSocialMediaDtoRes>(`http://localhost:8080/social-medias`, updateReq)
    }

    delete(id: string) : Observable<DeleteBySocialMediaIdDtoRes> {
        return this.http.delete<DeleteBySocialMediaIdDtoRes>(`http://localhost:8080/social-medias/${id}`)
    }
}