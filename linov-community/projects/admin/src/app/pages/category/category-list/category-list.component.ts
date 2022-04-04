import { Component, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllCategoryDtoDataRes } from '../../../../../../core/src/app/dto/category/get-all-category-dto-data-res';
import { CategoryService } from '../../../../../../core/src/app/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  data: GetAllCategoryDtoDataRes[] = []

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query: string): void {
    this.loading = true;

    startPage = startPage != 0 ? (startPage / this.maxPage) + 1 : startPage

    this.categoryService.getAll(query, startPage, maxPage).subscribe({
      next: result => {
        this.data = result.data
        this.loading = false
        this.totalRecords = result.total
      },
      error: _ => this.loading = false
    })
  }

  clear(table: Table): void {
    table.clear();
  }

  filter(text: any): void {
    this.data = this.data.filter(d => {
      return d.categoryCode?.includes(text) || d.categoryName?.toString().includes(text)
    })
  }

  update(id: number): void {

  }

  deleteById(id: number): void {

  }

}
