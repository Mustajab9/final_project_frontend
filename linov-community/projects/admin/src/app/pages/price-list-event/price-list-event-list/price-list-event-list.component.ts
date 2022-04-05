import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllPriceListEventDtoDataRes } from 'projects/core/src/app/dto/price-list-event/get-all-price-list-event-dto-data-res';
import { PriceListEventService } from 'projects/core/src/app/service/price-list-event.service';

@Component({
  selector: 'app-price-list-event-list',
  templateUrl: './price-list-event-list.component.html',
  styleUrls: ['./price-list-event-list.component.css']
})
export class PriceListEventListComponent implements OnInit {

  data: GetAllPriceListEventDtoDataRes[] = []

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private priceListEventService: PriceListEventService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage, query?: string): void {
    this.loading = true;

    // startPage = startPage != 0 ? (startPage / this.maxPage) + 1 : startPage

    this.priceListEventService.getAll(startPage, maxPage, query).subscribe({
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
      return d.priceCode?.includes(text) || d.priceName?.toString().includes(text)
    })
  }

  update(id: number): void {

  }

  deleteById(id: number): void {

  }

}
