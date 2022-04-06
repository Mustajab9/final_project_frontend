import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllCategoryDtoDataRes } from '../../../../../../core/src/app/dto/category/get-all-category-dto-data-res';
import { CategoryService } from '../../../../../../core/src/app/service/category.service';
import { ConfirmationService } from 'primeng/api';
import { deleteCategoryAction } from '../../../../../../core/src/app/state/category/category.action';
import { Subscription } from 'rxjs';
import { categorySelectorDelete } from '../../../../../../core/src/app/state/category/category.selector';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  data: GetAllCategoryDtoDataRes[] = []

  getAllCategorySubscription?: Subscription
  categoryDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private categoryService: CategoryService,
              private confirmationService: ConfirmationService) {
      this.title.setTitle('Category List')
  }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true;

    this.getAllCategorySubscription = this.categoryService.getAll(startPage, maxPage, query).subscribe({
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
    this.router.navigateByUrl(`/admin/category/${id}`)
  }

  deleteProgress(): void {
    this.categoryDeleteSubscription = this.store.select(categorySelectorDelete).subscribe(result => {
      if (result) {
        this.getData(0, 10)
      }
    })
  }

  deleteById(id: string){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this data?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.store.dispatch(deleteCategoryAction({ payload: id }))
          this.deleteProgress()
      }
    });
  }

  ngOnDestroy(): void {
    this.getAllCategorySubscription?.unsubscribe
    this.categoryDeleteSubscription?.unsubscribe
  }
}
