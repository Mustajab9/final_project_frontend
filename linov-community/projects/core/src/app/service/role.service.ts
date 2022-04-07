import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByRoleIdDtoRes } from '../dto/role/delete-by-role-id-dto-res'
import { GetAllRoleDtoRes } from '../dto/role/get-all-role-dto-res'
import { GetByRoleCodeDtoRes } from '../dto/role/get-by-role-code-dto-res'
import { GetByRoleIdDtoRes } from '../dto/role/get-by-role-id-dto-res'
import { InsertRoleDtoReq } from '../dto/role/insert-role-dto-req'
import { InsertRoleDtoRes } from '../dto/role/insert-role-dto-res'
import { UpdateRoleDtoReq } from '../dto/role/update-role-dto-req'
import { UpdateRoleDtoRes } from '../dto/role/update-role-dto-res'

@Injectable({
    providedIn: 'root'
})

export class RoleService {
    constructor(private http: HttpClient) {
    }

    getAll(startPage?: number, maxPage?: number, query?: string): Observable<GetAllRoleDtoRes> {
        if(startPage || maxPage){
            if (query) {
                return this.http.get<GetAllRoleDtoRes>(`http://localhost:8080/roles?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
            } else {
                return this.http.get<GetAllRoleDtoRes>(`http://localhost:8080/roles?startPage=${startPage}&maxPage=${maxPage}`)
            }
        }else{
            return this.http.get<GetAllRoleDtoRes>('http://localhost:8080/roles')
        }
    }

    getById(id: string): Observable<GetByRoleIdDtoRes> {
        return this.http.get<GetByRoleIdDtoRes>(`http://localhost:8080/roles/${id}`)
    }

    getByCode(code: string): Observable<GetByRoleCodeDtoRes> {
        return this.http.get<GetByRoleCodeDtoRes>(`http://localhost:8080/roles/code-${code}`)
    }

    insert(insertReq: InsertRoleDtoReq): Observable<InsertRoleDtoRes> {
        return this.http.post<InsertRoleDtoRes>(`http://localhost:8080/roles`, insertReq)
    }

    update(updateReq: UpdateRoleDtoReq): Observable<UpdateRoleDtoRes> {
        return this.http.put<UpdateRoleDtoRes>(`http://localhost:8080/roles`, updateReq)
    }

    delete(id: string): Observable<DeleteByRoleIdDtoRes> {
        return this.http.delete<DeleteByRoleIdDtoRes>(`http://localhost:8080/roles/${id}`)
    }
}