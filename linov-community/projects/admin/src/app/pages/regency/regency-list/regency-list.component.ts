import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllRegencyDtoDataRes } from 'projects/core/src/app/dto/regency/get-all-regency-dto-data-res';
import { RegencyService } from 'projects/core/src/app/service/regency.service';

@Component({
  selector: 'app-regency-list',
  templateUrl: './regency-list.component.html',
  styleUrls: ['./regency-list.component.css']
})
export class RegencyListComponent implements OnInit {

  data: GetAllRegencyDtoDataRes[] = []

  maxPage : number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private regencyService: RegencyService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage : number = 0, maxPage : number = this.maxPage, query: string) : void {
    this.loading = true;

    startPage = startPage != 0 ? (startPage / this.maxPage) + 1 : startPage

    this.regencyService.getAll(query, startPage, maxPage).subscribe({
      next : result => {
        this.data = result.data
        this.loading = false
        this.totalRecords = result.total
      },
      error : _ => this.loading = false
    })
  }

  clear(table: Table) : void {
      table.clear();
  }

  filter(text : any) : void {
    this.data = this.data.filter(d => {
      return d.regancyCode?.includes(text) || d.regancyName?.toString().includes(text) || d.provinceCode?.toString().includes(text) || d.provinceName?.toString().includes(text)
    })
  }

}
