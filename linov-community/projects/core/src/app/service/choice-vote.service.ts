
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { GetAllChoiceVoteDtoRes } from '../dto/choice-vote/get-all-choice-vote-dto-res'
import { GetByChoiceVoteIdDtoRes } from '../dto/choice-vote/get-by-choice-vote-id-dto-res'
import { GetByPollingChoiceIdDtoRes } from '../dto/choice-vote/get-by-polling-choice-id-dto-res'
import { InsertChoiceVoteDtoReq } from '../dto/choice-vote/insert-choice-vote-dto-req'
import { InsertChoiceVoteDtoRes } from '../dto/choice-vote/insert-choice-vote-dto-res'

@Injectable({
    providedIn: 'root'
})

export class ChoiceVoteService {
    constructor(private http: HttpClient) {
    }

    getAll(): Observable<GetAllChoiceVoteDtoRes> {
        return this.http.get<GetAllChoiceVoteDtoRes>(`http://localhost:8080/choice-votes`)
    }

    getById(id: string): Observable<GetByChoiceVoteIdDtoRes> {
        return this.http.get<GetByChoiceVoteIdDtoRes>(`http://localhost:8080/choice-votes/${id}`)
    }

    getByChoice(id: string): Observable<GetByPollingChoiceIdDtoRes> {
        return this.http.get<GetByPollingChoiceIdDtoRes>(`http://localhost:8080/choice-votes/choice/${id}`)
    }

    insert(insertReq: InsertChoiceVoteDtoReq): Observable<InsertChoiceVoteDtoRes> {
        return this.http.post<InsertChoiceVoteDtoRes>(`http://localhost:8080/choice-votes`, insertReq)
    }
}