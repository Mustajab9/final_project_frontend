import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllPriceListMemberDtoDataRes } from 'projects/core/src/app/dto/price-list-member/get-all-price-list-member-dto-data-res';
import { PriceListMemberService } from 'projects/core/src/app/service/price-list-member.service';

@Component({
  selector: 'app-price-list-member-list',
  templateUrl: './price-list-member-list.component.html',
  styleUrls: ['./price-list-member-list.component.css']
})
export class PriceListMemberListComponent implements OnInit {

  data: GetAllPriceListMemberDtoDataRes[] = []

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private priceListMemberService: PriceListMemberService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true;

    // startPage = startPage != 0 ? (startPage / this.maxPage) + 1 : startPage

    this.priceListMemberService.getAll(startPage, maxPage, query).subscribe({
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

  }

  deleteById(id: number): void {

  }

}
