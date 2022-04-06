import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllPositionDtoDataRes } from '../../../../../../core/src/app/dto/position/get-all-position-dto-data-res';
import { PositionService } from '../../../../../../core/src/app/service/position.service';
import { deletePositionAction } from '../../../../../../core/src/app/state/position/position.action';
import { Subscription } from 'rxjs';
import { positionSelectorDelete } from '../../../../../../core/src/app/state/position/position.selector';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit, OnDestroy {

  data: GetAllPositionDtoDataRes[] = []

  getAllPositionSubscription?: Subscription
  positionDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
              private positionService: PositionService) {
    this.title.setTitle('Position List')
  }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true;

    this.getAllPositionSubscription = this.positionService.getAll(startPage, maxPage, query).subscribe({
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
      return d.positionCode?.includes(text) || d.positionName?.toString().includes(text)
    })
  }

  update(id: number): void {
    this.router.navigateByUrl(`/admin/position/${id}`)
  }

  deleteProgress(): void {
    this.positionDeleteSubscription = this.store.select(positionSelectorDelete).subscribe(result => {
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
          this.store.dispatch(deletePositionAction({ payload: id }))
          this.deleteProgress()
      }
    });
  }

  ngOnDestroy(): void {
    this.getAllPositionSubscription?.unsubscribe
    this.positionDeleteSubscription?.unsubscribe
  }

}
