import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllPriceListMemberDtoDataRes } from '../../../../../../core/src/app/dto/price-list-member/get-all-price-list-member-dto-data-res';
import { PriceListMemberService } from '../../../../../../core/src/app/service/price-list-member.service';
import { deletePriceListMemberAction } from '../../../../../../core/src/app/state/price-list-member/price-list-member.action';
import { Subscription } from 'rxjs';
import { priceListMemberSelectorDelete } from '../../../../../../core/src/app/state/price-list-member/price-list-member.selector';

@Component({
  selector: 'app-price-list-member-list',
  templateUrl: './price-list-member-list.component.html',
  styleUrls: ['./price-list-member-list.component.css']
})
export class PriceListMemberListComponent implements OnInit, OnDestroy {

  data: GetAllPriceListMemberDtoDataRes[] = []

  getAllPriceListMemberSubscription?: Subscription
  priceListMemberDeleteSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private title: Title, private router: Router, private store: Store, private confirmationService: ConfirmationService,
              private priceListMemberService: PriceListMemberService) {
    this.title.setTitle('Price List Member')
  }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true;

    this.getAllPriceListMemberSubscription = this.priceListMemberService.getAll(startPage, maxPage, query).subscribe({
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
      return d.priceCode?.includes(text)
    })
  }

  update(id: number): void {
    this.router.navigateByUrl(`/admin/price-list-member/${id}`)
  }

  deleteProgress(): void {
    this.priceListMemberDeleteSubscription = this.store.select(priceListMemberSelectorDelete).subscribe(result => {
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
          this.store.dispatch(deletePriceListMemberAction({ payload: id }))
          this.deleteProgress()
      }
    });
  }

  ngOnDestroy(): void {
    this.getAllPriceListMemberSubscription?.unsubscribe
    this.priceListMemberDeleteSubscription?.unsubscribe
  }

}
