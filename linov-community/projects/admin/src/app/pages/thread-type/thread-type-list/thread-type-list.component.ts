import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllThreadTypeDtoDataRes } from '../../../../../../core/src/app/dto/thread-type/get-all-thread-type-dto-data-res';
import { ThreadTypeService } from '../../../../../../core/src/app/service/thread-type.service';
import { deleteThreadTypeAction } from '../../../../../../core/src/app/state/thread-type/thread-type.action';
import { Subscription } from 'rxjs';
import { threadTypeSelectorDelete } from '../../../../../../core/src/app/state/thread-type/thread-type.selector';

@Component({
  selector: 'app-thread-type-list',
  templateUrl: './thread-type-list.component.html',
  styleUrls: ['./thread-type-list.component.css']
})
export class ThreadTypeListComponent implements OnInit, OnDestroy {

  data: GetAllThreadTypeDtoDataRes[] = []

  getAllThreadTypeSubscription?: Subscription
  threadTypeDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
              private threadTypeService: ThreadTypeService) {
    this.title.setTitle('Thread Type List')
  }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true;

    this.getAllThreadTypeSubscription = this.threadTypeService.getAll(startPage, maxPage, query).subscribe({
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
      return d.typeCode?.includes(text) || d.typeName?.toString().includes(text)
    })
  }

  update(id: number): void {
    this.router.navigateByUrl(`/admin/thread-type/${id}`)
  }

  deleteProgress(): void {
    this.threadTypeDeleteSubscription = this.store.select(threadTypeSelectorDelete).subscribe(result => {
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
          this.store.dispatch(deleteThreadTypeAction({ payload: id }))
          this.deleteProgress()
      }
    });
  }

  ngOnDestroy(): void {
    this.getAllThreadTypeSubscription?.unsubscribe
    this.threadTypeDeleteSubscription?.unsubscribe
  }
}
