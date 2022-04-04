
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByThreadAttachmentIdDtoRes } from '../dto/thread-attachment/delete-by-thread-attachment-id-dto-res'
import { GetAllThreadAttachmentDtoRes } from '../dto/thread-attachment/get-all-thread-attachment-dto-res'
import { GetByThreadAttachmentIdDtoRes } from '../dto/thread-attachment/get-by-thread-attachment-id-dto-res'
import { GetThreadAttachmentByThreadDtoRes } from '../dto/thread-attachment/get-thread-attachment-by-thread-dto-res'
import { InsertThreadAttachmentDtoReq } from '../dto/thread-attachment/insert-thread-attachment-dto-req'
import { InsertThreadAttachmentDtoRes } from '../dto/thread-attachment/insert-thread-attachment-dto-res'

@Injectable({
    providedIn: 'root'
})

export class ThreadAttachmentService {
    constructor(private http: HttpClient){
    }

    getAll() : Observable<GetAllThreadAttachmentDtoRes> {
        return this.http.get<GetAllThreadAttachmentDtoRes>(`http://localhost:8080/thread-attachments`)
    }

    getById(id: string) : Observable<GetByThreadAttachmentIdDtoRes> {
        return this.http.get<GetByThreadAttachmentIdDtoRes>(`http://localhost:8080/thread-attachments/${id}`)
    }

    getByThread(id: string) : Observable<GetThreadAttachmentByThreadDtoRes> {
        return this.http.get<GetThreadAttachmentByThreadDtoRes>(`http://localhost:8080/thread-attachments/thread/${id}`)
    }

    insert(insertReq: InsertThreadAttachmentDtoReq) : Observable<InsertThreadAttachmentDtoRes> {
        return this.http.post<InsertThreadAttachmentDtoRes>(`http://localhost:8080/thread-attachments`, insertReq)
    }

    delete(id: string) : Observable<DeleteByThreadAttachmentIdDtoRes> {
        return this.http.delete<DeleteByThreadAttachmentIdDtoRes>(`http://localhost:8080/thread-attachments/${id}`)
    }
}