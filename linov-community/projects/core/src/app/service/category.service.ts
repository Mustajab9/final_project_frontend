
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DeleteByCategoryIdDtoRes } from '../dto/category/delete-by-category-id-dto-res'
import { GetAllCategoryDtoRes } from '../dto/category/get-all-category-dto-res'
import { GetByCategoryIdDtoRes } from '../dto/category/get-by-category-id-dto-res'
import { InsertCategoryDtoReq } from '../dto/category/insert-category-dto-req'
import { InsertCategoryDtoRes } from '../dto/category/insert-category-dto-res'
import { UpdateCategoryDtoReq } from '../dto/category/update-category-dto-req'
import { UpdateCategoryDtoRes } from '../dto/category/update-category-dto-res'

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    constructor(private http: HttpClient) {
    }

    getAll(startPage?: number, maxPage?: number, query?: string): Observable<GetAllCategoryDtoRes> {
        if (startPage || maxPage) {
            if (query) {
                return this.http.get<GetAllCategoryDtoRes>(`http://localhost:8080/categories?query=${query}&startPage=${startPage}&maxPage=${maxPage}`)
            } else {
                return this.http.get<GetAllCategoryDtoRes>(`http://localhost:8080/categories?startPage=${startPage}&maxPage=${maxPage}`)
            }
        }else{
            return this.http.get<GetAllCategoryDtoRes>('http://localhost:8080/categories')
        }
    }
    getById(id: string): Observable<GetByCategoryIdDtoRes> {
        return this.http.get<GetByCategoryIdDtoRes>(`http://localhost:8080/categories/${id}`)
    }

    insert(insertReq: InsertCategoryDtoReq): Observable<InsertCategoryDtoRes> {
        return this.http.post<InsertCategoryDtoRes>(`http://localhost:8080/categories`, insertReq)
    }

    update(updateReq: UpdateCategoryDtoReq): Observable<UpdateCategoryDtoRes> {
        return this.http.put<UpdateCategoryDtoRes>(`http://localhost:8080/categories`, updateReq)
    }

    delete(id: string): Observable<DeleteByCategoryIdDtoRes> {
        return this.http.delete<DeleteByCategoryIdDtoRes>(`http://localhost:8080/categories/${id}`)
    }
}