import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GetAllProvinceDtoDataRes } from 'projects/core/src/app/dto/province/get-all-province-dto-data-res';
import { ProvinceService } from 'projects/core/src/app/service/province.service';

@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.css']
})
export class ProvinceListComponent implements OnInit {

  data: GetAllProvinceDtoDataRes[] = []

  maxPage : number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private provinceService: ProvinceService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  getData(startPage : number = 0, maxPage : number = this.maxPage, query: string) : void {
    this.loading = true;

    startPage = startPage != 0 ? (startPage / this.maxPage) + 1 : startPage

    this.provinceService.getAll(query, startPage, maxPage).subscribe({
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
      return d.provinceCode?.includes(text) || d.provinceName?.toString().includes(text)
    })
  }

}
